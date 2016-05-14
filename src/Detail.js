import React from 'react';
import DetailPlayer from './DetailPlayer';
import DetailController from './DetailController';
import axios from 'axios';
import Utils from './Utils';
import PlaylistRepository from './PlaylistRepository';
import Config from './Configuration';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      playing: 1,
      selecting: -1,
      inputText: '',
    };

    this.onNextMusic = this.onNextMusic.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
    this.onClickPlay = this.onClickPlay.bind(this);
    this.onChangeInputText = this.onChangeInputText.bind(this);
    this.onAddNewItem = this.onAddNewItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  componentWillMount() {
    this.setState({
      playlist: PlaylistRepository.fetch(),
    });
  }

  onNextMusic(nextPlaying, playlist, updateState) {
    if (updateState) {
      this.setState({
        playing: nextPlaying,
        playlist,
      });
    }
    PlaylistRepository.save(playlist);
  }

  onClickItem(item) {
    this.setState({
      selecting: (this.state.selecting !== item.id) ? item.id : -1,
    });
  }

  onClickPlay(item) {
    this.setState({
      playing: item.id,
    });
  }

  onChangeInputText(text) {
    this.setState({
      inputText: text,
    });
  }

  onAddNewItem() {
    const params = Utils.parseParameters(this.state.inputText);
    const videoId = params.v;
    if (videoId) {
      axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${Config.apikey}&fields=items(id,snippet(channelTitle,title,thumbnails),statistics)&part=snippet,contentDetails,statistics`)
        .then(response => {
          if (response.data.items.length > 0) {
            const maxId = this.state.playlist.reduce((x, y) => ((x > y.id) ? x : y.id), 0);
            const newPlaylist = this.state.playlist.concat([{
              id: maxId + 1,
              videoId: response.data.items[0].id,
              title: response.data.items[0].snippet.title,
              volume: 50,
            }]);
            this.setState({
              playlist: newPlaylist,
            });
            PlaylistRepository.save(newPlaylist);
          }
        })
        .catch(response => {
          console.error(response);
        });
    }

    this.setState({
      inputText: '',
    });
  }

  onDeleteItem() {
    const selecting = this.state.selecting;
    const playing = this.state.playing;
    if (selecting && selecting !== playing) {
      const newPlaylist = this.state.playlist.filter(x => x.id !== selecting);
      this.setState({
        playlist: newPlaylist,
        selecting: -1,
      });
      PlaylistRepository.save(newPlaylist);
    }
  }

  render() {
    return (
      <div id="detail">
        <div id="detail-player">
          <DetailPlayer
            playlist={this.state.playlist}
            playing={this.state.playing}
            onNextMusic={this.onNextMusic}
          />
        </div>
        <DetailController
          playlist={this.state.playlist}
          playing={this.state.playing}
          selecting={this.state.selecting}
          inputText={this.state.inputText}
          onClickItem={this.onClickItem}
          onClickPlay={this.onClickPlay}
          onChangeInputText={this.onChangeInputText}
          onAddNewItem={this.onAddNewItem}
          onDeleteItem={this.onDeleteItem}
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
