import React from 'react';
import MusicFormInput from './MusicFormInput';
import MusicFormAddBtn from './MusicFormAddBtn';
import MusicFormDeleteBtn from './MusicFormDeleteBtn';

class MusicForm extends React.Component {
  render() {
    return (
      <div id="music-form">
        <MusicFormInput />
        <div id="music-form-btn">
          <MusicFormAddBtn />
          <MusicFormDeleteBtn />
        </div>
      </div>
    );
  }
}

export default MusicForm;
