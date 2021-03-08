import React, { Component, createRef } from 'react';
import qs from 'query-string';

const hashNamePairs = require('../../data/hashNamePairs.json');

export class Home extends Component {
  constructor() {
    super();
    this.posterRef = createRef();
    this.videoRef = createRef();
    this.videoPlayRef = createRef();
  }

  handlePlay(event) {
    event.preventDefault();
    this.videoRef.current.src += '?autoplay=1&VQ=HD1080';
    setTimeout(() => {
      this.posterRef.current.style.display = 'none';
      this.videoPlayRef.current.style.display = 'none';
    }, 600);
  }

  get nameFromHash() {
    const parsedQueryString = qs.parse(location.search);
    return hashNamePairs[parsedQueryString[Object.keys(parsedQueryString)[0]]] || 'Donator';
  }

  render() {
    return (
      <div className="site">
        <div className="header">
          <div className="container d-flex justify-content-between flex-column flex-md-row">
            <div className="header-logo">
              <img src={require('Img/logo.png')} alt="logo" />
            </div>
            <div className="header-logo-secondary float-right">
              <img src={require('Img/logo-secondary.svg')} alt="logo-secondary" />
            </div>
          </div>
        </div>
        <div className="main">
          <div className="container">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center">
                  A heartfelt thank you, {this.nameFromHash}, for <span className="text-primary">transforming the lives</span> of people living with MS.
                </h1>
              </div>
              <div className="card-body bg-dark">
                <div className="video-container">
                  <iframe src="https://www.youtube.com/embed/m-Nozezldps" alt="video" className="video" allowFullScreen="allowfullscreen" ref={this.videoRef} />
                  <div
                    className="poster"
                    ref={this.posterRef}
                    style={{
                      background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://img.youtube.com/vi/m-Nozezldps/maxresdefault.jpg') center`,
                      backgroundSize: 'cover',
                    }} />
                  <button className="video-play" onClick={this.handlePlay.bind(this)} ref={this.videoPlayRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container clearfix">
            <div className="footer-logo float-right">
              <img src={require('Img/footer.png')} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
