import React from 'react';

class MusicFormAddBtn extends React.Component {
  render() {
    return (
      <button
        id="btn-add"
        className="btn"
        onClick={this.props.onAddNewItem}
      >Add</button>
    );
  }
}

MusicFormAddBtn.propTypes = {
  onAddNewItem: React.PropTypes.func,
};

export default MusicFormAddBtn;
