import React from 'react';
import MusicItem from './MusicItem';

class MusicList extends React.Component {
  onClickItem(item) {
    this.props.onClickItem(item);
  }

  onClickPlay(item) {
    this.props.onClickPlay(item);
  }

  render() {
    const itemNodes = this.props.playlist.map((x) => {
      const onClickItem = this.onClickItem.bind(this, x);
      const onClickPlay = this.onClickPlay.bind(this, x);
      return (
        <MusicItem
          key={x.id}
          idName={`music-item${x.id}`}
          isPlaying={x.id === this.props.playing}
          isChecked={x.id === this.props.selecting}
          onClickItem={onClickItem}
          onClickPlay={onClickPlay}
        >{x.title}</MusicItem>
      );
    });

    return (
      <div id="music-list">
        <ul className="scroll-list">
          {itemNodes}
        </ul>
      </div>
    );
  }
}

MusicList.propTypes = {
  playlist: React.PropTypes.array,
  playing: React.PropTypes.number,
  selecting: React.PropTypes.number,
  onClickItem: React.PropTypes.func,
  onClickPlay: React.PropTypes.func,
};

export default MusicList;
