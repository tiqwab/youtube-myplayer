import React from 'react';
import MusicList from './MusicList';
import MusicForm from './MusicForm';

class DetailController extends React.Component {
  render() {
    return (
      <div id="detail-controller">
        <MusicList
          playlist={this.props.playlist}
          playing={this.props.playing}
          selecting={this.props.selecting}
          onClickItem={this.props.onClickItem}
          onClickPlay={this.props.onClickPlay}
        />
        <MusicForm
          inputText={this.props.inputText}
          onChangeInputText={this.props.onChangeInputText}
          onAddNewItem={this.props.onAddNewItem}
          onDeleteItem={this.props.onDeleteItem}
        />
      </div>
    );
  }
}

DetailController.propTypes = {
  playlist: React.PropTypes.array,
  playing: React.PropTypes.number,
  selecting: React.PropTypes.number,
  onClickItem: React.PropTypes.func,
  onClickPlay: React.PropTypes.func,
  inputText: React.PropTypes.string,
  onChangeInputText: React.PropTypes.func,
  onAddNewItem: React.PropTypes.func,
  onDeleteItem: React.PropTypes.func,
};

export default DetailController;
