import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  thumbnail: {
    flex: 1,
    width: 100,
    height: 100
  },
  infoContainer: {
    flex: 3,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  lowInfoContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    flex: 1,
    padding: 10
  },
  title: {
    flex: 2,
    padding: 10,
    fontSize: 18
  },
  author: {
    flex: 2,
    fontSize: 10
  },
  score: {
    flex: 1,
    fontSize: 8
  },
  comments: {
    flex: 1,
    fontSize: 8
  }
});

export default class PostListItem extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    thumbnail: PropTypes.string,
    date: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    score: PropTypes.number,
    comments: PropTypes.number,
    onPress: PropTypes.func
  }

  _onPress = () => {
    this.props.onPress(this.props.id);
  }

  _getPrettyDate = (date) => {
    let creationDate = new Date(date*1000);
    let currentDate = new Date();
    let secondsDiffTime = parseInt((currentDate - creationDate)/1000);
    let pretty = "";
    if(secondsDiffTime < 60) {
      pretty = `${secondsDiffTime} seconds`;
    } else {
      let minutesDiffTime = parseInt(secondsDiffTime/60);
      if(minutesDiffTime < 60) {
        pretty = `${minutesDiffTime} minutes`;
      } else {
        let hoursDiffTime = parseInt(minutesDiffTime/60);
        if(hoursDiffTime < 24) {
          pretty = `${hoursDiffTime} hours`;
        } else {
          let daysDiffTime = parseInt(hoursDiffTime/24);
            pretty = `${daysDiffTime} days`;
        }
      }
    }
    return `${pretty} ago`;
  }

  render () {
    const {id, thumbnail, date, title, author, score, comments} = this.props;
    let prettyDate = this._getPrettyDate(date);
    return (
      <TouchableOpacity style={styles.container} onPress={this._onPress}>
      {/* <View style={styles.container}> */}
        <Image
          style={styles.thumbnail}
          source={{uri:thumbnail}}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.date}>{prettyDate.toLocaleString()}</Text>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.lowInfoContainer}>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.score}>Score: {score}</Text>
            <Text style={styles.comments}>Comments: {comments}</Text>
          </View>
        </View>
      {/* </View> */}
      </TouchableOpacity>
    );
  }
}