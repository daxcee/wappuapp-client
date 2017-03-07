'use strict';

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Icon from 'react-native-vector-icons/Ionicons';
const IOS = Platform.OS === 'ios';

import {
  getRadioMode,
  getRadioStatus,
  getRadioSong,
  getRadioName,
  getRadioUrl,
  toggleRadioBar,
  setRadioSong,
  setRadioStatus,
} from '../concepts/radio';
import theme from '../style/theme';
import autobind from 'autobind-decorator';
import PlayerUI from '../components/radio/PlayerUI';

const { height } = Dimensions.get('window');

const PLAYER_HEIGHT_EXPANDED = IOS ? height - 60 - 48 : height - 77;
const PLAYER_HEIGHT = IOS ? 50 : 56;

class RadioPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playerHeight: new Animated.Value(PLAYER_HEIGHT)
    };
  }

  @autobind
  toggle() {
    const nextState = !this.props.expanded;
    if (!nextState) {
      return;
    }

    this.animateRadioBar(nextState);
    this.props.toggleRadioBar(nextState);
  }

  @autobind
  close() {
    this.animateRadioBar(false);
    this.props.toggleRadioBar(false);
  }

  animateRadioBar(nextState) {
    Animated.timing(this.state.playerHeight,
      { duration: 200, easing: Easing.quad, toValue: nextState ? PLAYER_HEIGHT_EXPANDED : PLAYER_HEIGHT}).start();
  }

  render() {
    const { playerHeight } = this.state;
    const { expanded, song, status, url, name } = this.props;

    return (
      <Animated.View style={[styles.container, { height: playerHeight }]}>
        {expanded && <Image
          resizeMode={'contain'}
          source={require('../../assets/radio.png')}
          // source={require('../../assets/rakkauden-wappuradio.png')}
          style={styles.bgImage} />
        }
        <TouchableOpacity
        activeOpacity={1}
        onPress={this.toggle}
        style={styles.pressable}>
          <PlayerUI
            setRadioStatus={this.props.setRadioStatus}
            setRadioSong={this.props.setRadioSong}
            radioStationName={name}
            status={status}
            song={song}
            url={url}
          />
          {expanded &&
            <TouchableOpacity onPress={this.close} style={styles.close} >
              <Icon name="ios-arrow-up-outline" style={styles.closeArrow} />
            </TouchableOpacity>
          }
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderStyle: 'solid',
    borderBottomWidth: 0,
    borderBottomColor: theme.secondary,
    position: 'absolute',
    left: 0,
    right: 0,
    height: PLAYER_HEIGHT,
    zIndex: 0,
    top: IOS ? 20 : 0,
    backgroundColor: theme.white, // 'rgba(255, 255, 255, .95)',
    overflow: 'hidden',
    elevation: 1,
  },
  bgImage: {
    position: 'absolute',
    height: PLAYER_HEIGHT_EXPANDED - 250,
    bottom: 35,
    opacity: 0.8,
    tintColor: theme.secondary,
  },
  pressable: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  close: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  closeArrow: {
    fontSize: 30,
    marginBottom: 5,
    color: 'rgba(0, 0, 0, .3)',
    backgroundColor: 'transparent'
  }
});

const mapDispatchToProps = {
  setRadioStatus,
  setRadioSong,
  toggleRadioBar
}

const mapStateToProps = createStructuredSelector({
  url: getRadioUrl,
  name: getRadioName,
  status: getRadioStatus,
  song: getRadioSong,
  expanded: getRadioMode
});

export default connect(mapStateToProps, mapDispatchToProps)(RadioPlayer);

