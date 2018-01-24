import React from 'react';
import {Button, ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native';
import {sortBy} from 'lodash';

import PostListItem from '../Components/PostListItem';

export default class PostList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false,
      posts: [],
      filterModes: ['New', 'Top', 'Hot', 'Controversial'],
      currentFilterMode: 0
    }
    this._refreshPosts = this._refreshPosts.bind(this);
    this._filter = this._filter.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: `r/pics lst posts`,
      headerRight: (<Button
        title={`${params.mode}`}
        onPress={params.filter ? () => params.filter(params.mode) : () => null}
      />)
    }
  };

  componentDidMount() {
    let mode = this.state.filterModes[this.state.currentFilterMode];
    this.props.navigation.setParams({
      mode,
      filter: this._filter
    });
    this._requestPosts();
  }

  _filter(mode) {
    let currentFilterMode = this.state.currentFilterMode + 1;
    if(currentFilterMode >= this.state.filterModes.length) currentFilterMode = 0;
    let nextMode = this.state.filterModes[currentFilterMode];

    this.props.navigation.setParams({
      mode: nextMode
    });

    this.setState({
      currentFilterMode
    }, () => (this._refreshPosts()))
  }

  _requestPosts() {
    return fetch('https://api.reddit.com/r/pics/new.json')
      .then(resp => resp.json())
      .then(posts => {
        posts = posts.data.children;
        let filterMode = this.state.currentFilterMode;

        switch(filterMode) {
          case 0: // new
            posts = sortBy(posts, (elem) => (-elem.data.created_utc));
            break;
          case 1: // top
            posts = sortBy(posts, [(elem) => (-elem.data.score)]);
            break;
          case 2: // hot
            posts = sortBy(posts, [(elem) => (-elem.data.num_comments)]);
            break;
          case 3: // controversial
            break;
          default:
        }
        this.setState({
          isLoading: false,
          isRefreshing: false,
          posts: posts || []
        });
      })
      .catch(err => {
        console.error(err);
      })
  }

  _refreshPosts() {
    this.setState({
      isRefreshing: true
    }, () => {
      this._requestPosts();
    });
  }

  _keyExtractor = (item, index) => item.data.id;

  _onPressItem = (id) => {
    this.props.navigation.navigate('PostWebView', {id});
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    let postList = this.state.posts ;
    return (
      <FlatList
        data={postList}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) => <PostListItem
            id={item.data.id}
            thumbnail={item.data.thumbnail}
            date={item.data.created_utc}
            title={item.data.title}
            author={item.data.author}
            score={item.data.score}
            comments={item.data.num_comments}
            onPress={this._onPressItem}
          />}
        refreshing={this.state.isRefreshing}
        onRefresh={this._refreshPosts}
      />
    );
  }
}


