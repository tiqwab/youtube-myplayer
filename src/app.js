import React from 'react';
import ReactDOM from 'react-dom';
import Detail from './Detail';

const playlist = [
  { id: 1, videoId: 'Kt_JePg86b8', title: 'Music 1', volume: 100 },
  { id: 2, videoId: 'qhrj-Vqp95s', title: 'Music 2', volume: 75 },
  { id: 3, videoId: 'NX8egPe6Ulc', title: 'Music 3', volume: 30 },
];

ReactDOM.render(
  <Detail />,
  document.getElementById('main')
);
