const ITEM_PLAYLIST = 'playlist';

const PlaylistRepository = {
  fetch: () => {
    let playlist = [];
    const stored = localStorage.getItem(ITEM_PLAYLIST);
    if (stored) {
      playlist = JSON.parse(stored);
    }
    return playlist;
  },

  save: (playlist) => {
    if (playlist) {
      localStorage.setItem(ITEM_PLAYLIST, JSON.stringify(playlist));
    }
  },
};

export default PlaylistRepository;
