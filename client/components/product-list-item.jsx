import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="card">
        <div className="product-image-holder">
          <img src={this.props.image} className="card-img-top small-product-image" alt=""/>
        </div>
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <h4 className="card-title product-name">{this.props.name}</h4>
          <h5 className="card-text price">$ {(this.props.price / 100).toFixed(2)}</h5>
          {/* <p className="card-text description">{this.props.shortDesc}</p> */}
        </div>
      </div>

    );
  }
}

export default ProductListItem;
