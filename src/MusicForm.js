import React from 'react';
import MusicFormInput from './MusicFormInput';
import MusicFormAddBtn from './MusicFormAddBtn';
import MusicFormDeleteBtn from './MusicFormDeleteBtn';

class MusicForm extends React.Component {
  render() {
    return (
      <div id="music-form">
        <MusicFormInput
          inputText={this.props.inputText}
          onChangeInputText={this.props.onChangeInputText}
          onAddNewItem={this.props.onAddNewItem}
        />
        <div id="music-form-btn">
          <MusicFormAddBtn onAddNewItem={this.props.onAddNewItem} />
          <MusicFormDeleteBtn onDeleteItem={this.props.onDeleteItem} />
        </div>
      </div>
    );
  }
}

MusicForm.propTypes = {
  inputText: React.PropTypes.string,
  onChangeInputText: React.PropTypes.func,
  onAddNewItem: React.PropTypes.func,
  onDeleteItem: React.PropTypes.func,
};

export default MusicForm;
