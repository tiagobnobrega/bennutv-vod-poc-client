import React, { Component } from 'react';
import SideMenu from './SideMenu';
import Content from './Content';
import { loadVideos } from '../_common/api';
import './View.css';

export default class VideoView extends Component {
  state = {
    videoLinks: [],
    error: null,
    activeLinkKey: null,
    videoUrl: null,
  };

  render() {
    const { videoLinks, activeLinkKey, videoUrl } = this.state;
    if (videoLinks === null) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="video-view">
        <SideMenu
          labelAttr="srcVideo"
          activeLinkKey={activeLinkKey}
          links={videoLinks.map(l => ({ ...l, onClick: this.onClickVideo }))}
        />
        {videoUrl ? (
          <Content src={videoUrl} />
        ) : (
          <div className="content">
            <h1>&lt;--- Escolha o vídeo ao lado </h1>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.asyncRequest = loadVideos().then(videoLinks => {
      this.asyncRequest = null;
      if (videoLinks.error) {
        this.setState({ error: videoLinks.error });
      } else {
        console.log('videoLinks', videoLinks);
        this.setState({ videoLinks, error: null });
      }
    });
  }

  componentWillUnmount() {
    if (this.asyncRequest) {
      this.asyncRequest.cancel();
    }
  }

  onClickVideo = link => {
    const { guid: activeLinkKey, hlsUrl: videoUrl } = link;
    this.setState({ activeLinkKey, videoUrl });
  };
}
