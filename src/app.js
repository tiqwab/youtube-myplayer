import youtubePlayer from 'youtube-player';
import React from 'react';
import ReactDOM from 'react-dom';
import DetailController from './DetailController';

const PlayerState = {
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

const playlist = [
  { id: 1, videoId: 'hv7LLHjKACg', title: 'Music 1', volume: 100 },
  { id: 2, videoId: 'mc_cJXimj5Y', title: 'Music 2', volume: 75 },
  { id: 3, videoId: '5mzsD2rfR94', title: 'Music 3', volume: 30 },
];

let playIndex = 0;
let selectingId = 3;

ReactDOM.render(
  <DetailController
    playlist={playlist}
    playing={playlist[playIndex].id}
    selecting={selectingId}
  />,
  document.getElementById('detail-controller')
);


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
