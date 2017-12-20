import { TabNavigator, StackNavigator } from 'react-navigation'
import PostList from '../Containers/PostList';
import PostWebView from '../Containers/PostWebView';

const Root = StackNavigator({
  PostList: {
    screen: PostList//,
    // navigationOptions: { title: 'Login' }
  },
  PostWebView: {
    screen: PostWebView
  }
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'PostList',
  navigationOptions: {
    // headerStyle: styles.header
  }
});

export default Root