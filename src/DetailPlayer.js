import React from 'react';
import youtubePlayer from 'youtube-player';

const PlayerState = {
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

class DetailPlayer extends React.Component {
  componentWillMount() {
    const playerTag = document.getElementById('detail-player');

    const player = youtubePlayer('detail-player', {
      height: playerTag.dataset.height,
      width: playerTag.dataset.width,
    });

    const playlist = this.props.playlist;
    const playing = this.props.playing;
    const playingMusic = playlist[playing];

    player.on('stateChange', (event) => {
      if (event.data === PlayerState.ENDED) {
        player.getVolume()
              .then(volume => {
                if (volume !== playingMusic.volume) {
                  playingMusic.volume = volume;
                }
                return Promise.resolve(player);
              })
              .then(p => {
                const playIndex = playlist.findIndex((x) => x.id === playing);
                const nextPlayingMusic = playlist[(playIndex + 1) % playlist.length];
                p.loadVideoById(nextPlayingMusic.videoId);
                p.setVolume(nextPlayingMusic.volume);
                // this.props.playing = nextPlayingMusic.id;
              });
      }
    });

    player.cueVideoById(playlist[0].videoId);
    player.setVolume(playlist[0].volume);
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
};

export default DetailPlayer;
