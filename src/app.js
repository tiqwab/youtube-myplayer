import youtubePlayer from 'youtube-player';

const PlayerState = {
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

const player = youtubePlayer('player', {
  height: '390',
  width: '640',
});

const playlist = [
  { videoId: 'hv7LLHjKACg', volume: 100 },
  { videoId: 'mc_cJXimj5Y', volume: 75 },
  { videoId: '5mzsD2rfR94', volume: 30 },
];

let playIndex = 0;
player.on('stateChange', (event) => {
  if (event.data === PlayerState.ENDED) {
    player.getVolume()
          .then(volume => {
            console.log(volume);
            if (volume !== playlist[playIndex].volume) {
              console.log('change volume');
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
