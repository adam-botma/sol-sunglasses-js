import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.addToCart = props.addToCart;
    this.setView = props.setView;
    this.productId = props.productId;
  }

  componentDidMount() {
    fetch(`/api/products/${this.productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    if (this.state.product === null) {
      return <h3>....loading</h3>;
    } else {
      return (

        <div className="container">
          <div className="desc-head">
            <div onClick={() => this.setView('catalog', {})}><i className="fas fa-long-arrow-alt-left">Back</i></div>
            <div className="row">
              <div className="col-7 col-12-md  prod-img-dsc-pg ">
                <img src={this.state.product.image} alt=""/>
              </div>
              <div className="col-12-md col-5 ">
                <h1 className="product-name-dp">{this.state.product.name}</h1>
                <h3 className="product-price-dp">${(this.state.product.price / 100).toFixed(2)}</h3>
                <p className="short-desc-dp">{this.state.product.shortDescription}</p>
                <button className="btn btn-primary" onClick={() => this.addToCart(this.state.product)}>Add to Cart</button>
              </div>
              <p className="long-description"> {this.state.product.longDescription}</p>
            </div>
          </div>

        </div>
      );
    }
  }
}

export default ProductDetails;
