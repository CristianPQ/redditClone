import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { WebView } from 'react-native';

export default class PostWebView extends Component {

  static propTypes = {
    id: PropTypes.string
  }

  render() {
    let {id} = this.props.navigation.state.params;
    return (
      <WebView
        source={{uri: `https://www.reddit.com/r/pics/comments/${id}`}}
      />
    );
  }
}