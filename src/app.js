import youtubePlayer from 'youtube-player';

const player = youtubePlayer('player', {
  height: '390',
  width: '640',
  videoId: 'M7lc1UVf-VE',
});

player.playVideo();
