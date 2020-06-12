import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.price = props.price;
    this.shortDesc = props.shortDesc;
    this.image = props.image;
  }

  render() {
    return (
      <div className="card">
        <div className="product-image-holder">
          <img src={this.image} className="card-img-top small-product-image" alt=""/>
        </div>
        <div className="card-body">
          <h4 className="card-title product-name">{this.name}</h4>
          <h5 className="card-text price">$ {this.price}</h5>
          <p className="card-text description">{this.shortDesc}</p>
        </div>
      </div>

    );
  }
}

export default ProductListItem;
