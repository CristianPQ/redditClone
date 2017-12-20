import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import PostList from './Containers/PostList';
import Navigation from './Navigation'



export default class App extends React.Component {
  render() {
    return (
      <Navigation/>
    );
  }
}


