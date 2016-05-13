import React from 'react';

class MusicFormInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange() {
    this.props.onChangeInputText(
      this.refs.input.value
    );
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.props.onAddNewItem();
    }
  }

  render() {
    return (
      <div id="music-form-input">
        <input
          className="form-text"
          type="text"
          value={this.props.inputText}
          placeholder="Enter youtube url"
          ref="input"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}

MusicFormInput.propTypes = {
  inputText: React.PropTypes.string,
  onChangeInputText: React.PropTypes.func,
  onAddNewItem: React.PropTypes.func,
};

export default MusicFormInput;
