import React from 'react';
import DetailPlayer from './DetailPlayer';
import DetailController from './DetailController';

/*
 * State: playlist, playing, selecting
 */

class Detail extends React.Component {
  render() {
    return (
      <div id="detail">
        <div id="detail-player">
          <DetailPlayer
            playlist={this.props.playlist}
            playing={this.props.playing}
          />
        </div>
        <DetailController
          playlist={this.props.playlist}
          playing={this.props.playing}
          selecting={this.props.selecting}
        />
      </div>
    );
  }
}

Detail.propTypes = {
  playlist: React.PropTypes.array,
  playing: React.PropTypes.number,
  selecting: React.PropTypes.number,
};

export default Detail;
