'use strict';

import React, {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View
} from 'react-native';

import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';

import time from '../../utils/time';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  itemWrapper: {
    width: Dimensions.get('window').width,
    backgroundColor: '#f9f9f9',
    paddingBottom: 15
  },
  itemContent:{
    flex: 1,
    elevation: 2,
    backgroundColor: '#fff'
  },

  itemImageWrapper: {
    height: 400,
    width: Dimensions.get('window').width,
  },

  itemTextWrapper: {
    paddingLeft: 36,
    paddingRight: 15,
    paddingTop: 0,
    paddingBottom: 10,
    top: -10
  },
  feedItemListText: {
    fontSize: 13,
    color: theme.dark
  },
  feedItemListItemImg: {
    width: Dimensions.get('window').width,
    height: 400,
    backgroundColor: '#ddd'
  },
  feedItemListItemInfo: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  feedItemListItemAuthor:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemAuthorName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.secondary,
    paddingRight: 10
  },
  itemAuthorTeam:{
    fontSize:11,
    color: '#aaa'
  },
  feedItemListItemAuthorIcon:{
    color: '#bbb',
    fontSize: 15,
    marginTop: 1,
    paddingRight: 10
  },
  itemTimestamp: {
    color: '#aaa',
    fontSize: 13
  }
});

export default React.createClass({
  render() {
    const item = this.props.item;
    const ago = time.getTimeAgo(item.createdAt);

    return <View style={styles.itemWrapper}>
      <View style={styles.itemContent}>

      <View style={styles.feedItemListItemInfo}>
        <Icon name='android-contact' style={styles.feedItemListItemAuthorIcon} />
        <View style={styles.feedItemListItemAuthor}>
          <Text style={styles.itemAuthorName}>{item.author.name}</Text>
          <Text style={styles.itemAuthorTeam}>{item.author.team}</Text>
        </View>
        <Text style={styles.itemTimestamp}>{ago}</Text>
      </View>

      {item.type==='IMAGE' ?
        <View style={styles.itemImageWrapper}>
          <Image
            source={{ uri: item.url }}
            style={styles.feedItemListItemImg} />
        </View>
      :
        <View style={styles.itemTextWrapper}>
          <Text style={styles.feedItemListText}>{item.text}</Text>
        </View>
      }
      </View>
    </View>;
  }
});