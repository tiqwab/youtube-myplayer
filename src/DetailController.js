import React from 'react';
import MusicList from './MusicList';
import MusicForm from './MusicForm';

/*
 * State: playlist, playing, selecting
 */

class DetailController extends React.Component {
  render() {
    return (
      <div id="detail-controller">
        <MusicList
          playlist={this.props.playlist}
          playing={this.props.playing}
          selecting={this.props.selecting}
        />
        <MusicForm />
      </div>
    );
  }
}

DetailController.propTypes = {
  playlist: React.PropTypes.array,
  playing: React.PropTypes.number,
  selecting: React.PropTypes.number,
};

export default DetailController;
