import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Sound = require('react-native-sound');
import MusicControl from 'react-native-music-control';

import styles from './src/styles/main_styles.js';
import Button from './src/button';

class test_audio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audio: undefined
    }

    console.log(Sound.MAIN_BUNDLE)

    var audio = new Sound('overstep.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        // audio.setCategory('Playback');
        this.setState({audio: audio}, () => {

              MusicControl.setNowPlaying({
                title: 'Overstep',
                artwork: 'https://github.com/asommer70/audiopila-ios/raw/master/affinity/exports/Icon-Small-40%403x.png',
                persistentID: '001',
                playbackDuration: 78,
                elapsedPlaybackTime: 12
              })
        })
      }
    });
  }

  componentDidMount() {
    MusicControl.enableBackgroundMode(true);
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);

    MusicControl.on('play', ()=> {
      console.log('MusicControl pause...');
      this.audioAction();
    })

    MusicControl.on('pause', ()=> {
      console.log('MusicControl pause...');
      this.audioAction();
    })

    // this.state.audio.enableInSilenceMode(true);
  }

  audioAction() {
    console.log('audioAction...');
    this.state.audio.getCurrentTime((seconds, isPlaying) => {
      if (isPlaying) {
        console.log('pausing...');
        this.state.audio.pause();
      } else {
        console.log('playing...');
        this.state.audio.play();
      }
    })
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.wrapper, styles.justifyCenter]}>
          <Text style={styles.name}>
            Music Control Test! Woo
          </Text>
          <Button text={'Play/Pause'} onPress={this.audioAction.bind(this)} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('test_audio', () => test_audio);
