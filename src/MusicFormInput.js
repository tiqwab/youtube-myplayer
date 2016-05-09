import React from 'react';

class MusicFormInput extends React.Component {
  render() {
    return (
      <div id="music-form-input">
        <input
          className="form-text"
          type="text"
          placeholder="Enter youtube url"
        />
      </div>
    );
  }
}

export default MusicFormInput;
