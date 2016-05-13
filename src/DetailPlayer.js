import React from 'react';
import youtubePlayer from 'youtube-player';

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

  componentWillMount() {
    const playerTag = document.getElementById('detail-player');

    this.player = youtubePlayer('detail-player', {
      height: playerTag.dataset.height,
      width: playerTag.dataset.width,
    });

    this.player.on('stateChange', (event) => {
      const playlist = this.props.playlist;
      const playing = this.props.playing;
      const playingMusic = playlist.find((x) => x.id === playing);

      if (event.data === PlayerState.ENDED) {
        this.player.getVolume()
              .then(volume => {
                if (volume !== playingMusic.volume) {
                  playingMusic.volume = volume;
                }
                return Promise.resolve(this.player);
              })
              .then(() => {
                const playIndex = playlist.findIndex((x) => x.id === playing);
                const nextPlayingMusic = playlist[(playIndex + 1) % playlist.length];

                this.props.onNextMusic(nextPlayingMusic.id);
              });
      } else if (event.data === PlayerState.NOTSTART) {
        if (!this.prepared && this.props.playlist.length > 0) {
          this.player.cueVideoById(this.props.playlist[0].videoId);
          this.player.setVolume(this.props.playlist[0].volume);
          this.prepared = true;
        }
      }
    });

    if (!this.prepared && this.props.playlist.length > 0) {
      this.player.cueVideoById(this.props.playlist[0].videoId);
      this.player.setVolume(this.props.playlist[0].volume);
      this.prepared = true;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playing !== this.props.playing) {
      const nextPlayIndex = this.props.playlist.findIndex((x) => x.id === nextProps.playing);
      this.player.loadVideoById(this.props.playlist[nextPlayIndex].videoId);
      this.player.setVolume(this.props.playlist[nextPlayIndex].volume);
    }
  }

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
