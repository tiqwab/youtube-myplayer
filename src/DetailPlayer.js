import React from 'react';
import youtubePlayer from 'youtube-player';

// Cannot access YT.PlayerState from youtube-player (?), so declare same constant here.
const PlayerState = {
  NOTSTART: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

class DetailPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.prepared = false;
    this.player = null;
  }

  // Invoked before the initial rendering.
  componentWillMount() {
    const playerTag = document.getElementById('detail-player');

    // Player height and width come from data attributes of playerTag
    this.player = youtubePlayer('detail-player', {
      height: playerTag.dataset.height,
      width: playerTag.dataset.width,
    });

    this.player.on('stateChange', (event) => {
      const playlist = this.props.playlist;
      const playing = this.props.playing;
      const playingIndex = playlist.findIndex((x) => x.id === playing);

      // Play a next video automatically when the previous video ended.
      if (event.data === PlayerState.ENDED) {
        // All methods of youtube-player return Promise.
        this.player.getVolume()
              .then(volume => {
                if (volume !== playlist[playingIndex].volume) {
                  playlist[playingIndex].volume = volume;
                }
                return Promise.resolve(this.player);
              })
              .then(() => {
                const playIndex = playlist.findIndex((x) => x.id === playing);
                const nextPlayingMusic = playlist[(playIndex + 1) % playlist.length];
                this.props.onNextMusic(nextPlayingMusic.id, playlist, true);
              });
      // When player started after the first video is added to empty playlist.
      } else if (event.data === PlayerState.NOTSTART) {
        if (!this.prepared && playlist.length > 0) {
          this.player.cueVideoById(playlist[0].videoId);
          this.player.setVolume(playlist[0].volume);
          this.prepared = true;
        }
      }
    });

    // Cue the first video of playlist when the page is loaded.
    if (!this.prepared && this.props.playlist.length > 0) {
      this.player.cueVideoById(this.props.playlist[0].videoId);
      this.player.setVolume(this.props.playlist[0].volume);
      this.prepared = true;
    }
  }

  // Invoked when a component is receiving new props.
  // Note that coming 'new props' does not mean prop is changed.
  componentWillReceiveProps(nextProps) {
    const playlist = this.props.playlist;
    const playing = this.props.playing;
    const playingIndex = playlist.findIndex((x) => x.id === playing);

    if (nextProps.playing !== this.props.playing) {
      this.player.getVolume()
            .then(volume => {
              if (volume !== playlist[playingIndex].volume) {
                playlist[playingIndex].volume = volume;
              }
              this.props.onNextMusic(playing, playlist, false);
            })
            .then(() => {
              const nextPlayIndex = playlist.findIndex((x) => x.id === nextProps.playing);
              this.player.loadVideoById(playlist[nextPlayIndex].videoId);
              this.player.setVolume(playlist[nextPlayIndex].volume);
            });
    }
  }

  // Return always false not to invoke render method.
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="detail-player" />;
  }
}

DetailPlayer.propTypes = {
  playlist: React.PropTypes.array,
  playing: React.PropTypes.number,
  onNextMusic: React.PropTypes.func,
};

export default DetailPlayer;
