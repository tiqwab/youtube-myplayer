import React from 'react';
import MusicItem from './MusicItem';

class MusicList extends React.Component {
  render() {
    const itemNodes = this.props.playlist.map((x) => (
      <MusicItem
        key={x.id}
        idName={`music-item${x.id}`}
        isPlaying={x.id === this.props.playing}
        isChecked={x.id === this.props.selecting}
      >{x.title}</MusicItem>
    ));

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
};

export default MusicList;
