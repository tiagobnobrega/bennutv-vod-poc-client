/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';

class Palyer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: Date.now(),
    };

    this.hls = null;
  }

  componentDidUpdate() {
    this._initPlayer();
  }

  componentDidMount() {
    this._initPlayer();
  }

  componentWillUnmount() {
    const { hls } = this;

    if (hls) {
      hls.destroy();
    }
  }

  _initPlayer() {
    if (this.hls) {
      this.hls.destroy();
    }

    const { src, autoplay, hlsConfig } = this.props;
    const { video: $video } = this.refs;
    const hls = new Hls(hlsConfig);

    hls.loadSource(src);
    hls.attachMedia($video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (autoplay) {
        $video.play();
      }
    });

    this.hls = hls;
  }

  render() {
    const { playerId } = this.state;
    const { controls, width, height, poster, videoProps, className } = this.props;

    return (
      <div key={playerId} className="player-area">
        <video
          ref="video"
          className={className}
          id={`react-hls-${playerId}`}
          controls={controls}
          width={width}
          height={height}
          poster={poster}
          isHLS={true}
          {...videoProps}
        />
      </div>
    );
  }
}

Palyer.propTypes = {
  url: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
  hlsConfig: PropTypes.object, // https://github.com/dailymotion/hls.js/blob/master/API.md#fine-tuning
  controls: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  poster: PropTypes.string,
  videoProps: PropTypes.object,
};

Palyer.defaultProps = {
  autoplay: false,
  hlsConfig: {},
  controls: true,
  width: 500,
  height: 375,
};

export default Palyer;
