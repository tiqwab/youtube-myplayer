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
    const playerTag = document.getElementById('player');

    const player = youtubePlayer('player', {
      height: playerTag.dataset.height,
      width: playerTag.dataset.width,
    });

    player.on('stateChange', (event) => {
      if (event.data === PlayerState.ENDED) {
        player.getVolume()
              .then(volume => {
                if (volume !== playlist[playIndex].volume) {
                  playlist[playIndex].volume = volume;
                }
                return Promise.resolve(player);
              })
              .then(p => {
                playIndex = (playIndex + 1) % 3;
                p.loadVideoById(playlist[playIndex].videoId);
                p.setVolume(playlist[playIndex].volume);
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
    return '';
  }
}

export default DetailPlayer;
