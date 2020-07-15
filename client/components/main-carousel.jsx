import React from 'react';

class MainCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 1
    };
    this.whichImage = this.whichImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.setView = props.setView;
  }

  whichImage() {
    if (this.state.image === 1) {
      return 'image-carousel d-flex';
    }
    if (this.state.image === 2) {
      return 'image-carousel d-flex move-to-next';
    }
    if (this.state.image === 3) {
      return 'image-carousel d-flex move-to-third';
    }
  }

  nextImage() {

    if (this.state.image < 3) {
      this.setState({ image: this.state.image + 1 });
    }
    if (this.state.image === 3) {
      this.setState({ image: 1 });
    }
  }

  previousImage() {

    if (this.state.image > 1) {
      this.setState({ image: this.state.image - 1 });
    }
    if (this.state.image === 1) {
      this.setState({ image: 3 });
    }
  }

  render() {
    return (
      <>
        <div className="homepage-container">
          <div className="nav-buttons d-flex align-items-center justify-content-between">
            <i className="fas fa-chevron-left fa-3x" onClick={this.previousImage}></i>
            <div></div>
            <i className="fas fa-chevron-right fa-3x" onClick={this.nextImage}></i>
          </div>
          <div className="image-carousel-container">
            <div className={this.whichImage()}>
              <div className="images image-1 d-flex flex-column align-items-center justify-content-center">
                <h1>New Styles</h1>
                <p>now live on the site</p>
                <button onClick={() => this.setView('shop', {})}
                  className="hp-btn align-self-center">shop now</button>
              </div>
              <div className="images image-2 d-flex flex-column align-items-center justify-content-center">
                <h1>New Styles</h1>
                <p>now live on the site</p>
                <button onClick={() => this.setView('shop', {})}
                  className="hp-btn align-self-center">shop now</button>
              </div>
              <div className="images image-3 d-flex flex-column align-items-center justify-content-center">
                <h1>New Styles</h1>
                <p>now live on the site</p>
                <button onClick={() => this.setView('shop', {})}
                  className="hp-btn align-self-center">shop now</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default MainCarousel;
