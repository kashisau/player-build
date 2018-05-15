import React, { Component } from 'react';
import './Player.css';

class Player extends Component {

  /**
   * Takes an image URL and modifies the filepath with the size string supplied.
   * @param {string} imagePath  The URL of the image to be modified (with file)
   *                            extension.
   * @param {string} size (Optional) size. This string is appended onto the file
   *                      path, just before the image extension.
   */
  responsiveImage = (imagePath, size) => {
    const SUPPORTED_EXTENSIONS = ['jpg','jpeg','png','gif'];
    // Cycle through each of the supported image extensions.
    let supportedImageUrl = SUPPORTED_EXTENSIONS.reduce((imagePath, testExtension) => {
      testExtension = `.${testExtension}`;
      
      let uriSegments = imagePath.split('/');
      let lastUriSegment = uriSegments.pop();
      if ( ! lastUriSegment) return imagePath;
      
      let filename = lastUriSegment.split(testExtension);
      let extension = filename.pop();
      if ( ! filename.length) return imagePath;
      
      extension = size + testExtension;
      filename.push(extension);
      uriSegments.push(filename.join(''));
      return uriSegments.join('/');
      
    }, imagePath);
    if (supportedImageUrl) return supportedImageUrl;
    
    return imagePath;
  }

  render() {
    return (
      <section className="Player" role="banner" aria-label="Event playback controls" tabIndex="0">
        <picture className="Player__background-image">
          <source media="(max-width: 320px)" srcSet={this.responsiveImage(this.props.image, '--small')} />
          <source media="(min-width: 1281px)" srcSet={this.responsiveImage(this.props.image, '--large')} />
          <img src={this.props.image} alt={`Episode cover for ${this.props.name}`} />
        </picture>
      </section>
    );
  }
}

export default Player;
