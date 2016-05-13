import React from 'react';

/*
 * FIXME: Fill of selected MusicItem
 */
class MusicItem extends React.Component {
  render() {
    const className = (this.props.isPlaying === true) ?
    'scroll-item scroll-item-selected'
    : 'scroll-item';

    return (
      <li className={className}>
        <input
          type="radio"
          name="selectMusic"
          value={this.props.children}
          id={this.props.idName}
          checked={this.props.isChecked}
          onClick={this.props.onClickItem}
        />
        <label htmlFor={this.props.idName}>{this.props.children}</label>
        <img
          src="btn-play.png"
          alt="play button"
          className="btn-play"
          onClick={this.props.onClickPlay}
        />
      </li>
    );
  }
}

MusicItem.propTypes = {
  children: React.PropTypes.string,
  idName: React.PropTypes.string,
  isPlaying: React.PropTypes.bool,
  isChecked: React.PropTypes.bool,
  onClickItem: React.PropTypes.func,
  onClickPlay: React.PropTypes.func,
};

export default MusicItem;
