import React from 'react';
import ReactDOM from 'react-dom';
import Detail from './Detail';

const playlist = [
  { id: 1, videoId: 'hv7LLHjKACg', title: 'Music 1', volume: 100 },
  { id: 2, videoId: 'mc_cJXimj5Y', title: 'Music 2', volume: 75 },
  { id: 3, videoId: '5mzsD2rfR94', title: 'Music 3', volume: 30 },
];

let playing = 1;
let selecting = 3;

ReactDOM.render(
  <Detail
    playlist={playlist}
    playing={playing}
    selecting={selecting}
  />,
  document.getElementById('main')
);
