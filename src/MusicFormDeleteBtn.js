import React from 'react';

class MusicFormDeleteBtn extends React.Component {
  render() {
    return (
      <button
        id="btn-delete"
        className="btn"
        onClick={this.props.onDeleteItem}
      >Delete</button>
    );
  }
}

MusicFormDeleteBtn.propTypes = {
  onDeleteItem: React.PropTypes.func,
};

export default MusicFormDeleteBtn;
