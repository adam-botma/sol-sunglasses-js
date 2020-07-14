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
        <>
          <div className="desc-head">
            <div onClick={() => this.setView('shop', {})}><i className="fas fa-long-arrow-alt-left"> Shop more</i></div>
          </div>
          <div className="product-container d-flex">
            <div className=" left-side col-lg-5 col-12 d-flex flex-column align-items-start justify-content-end">
              <div className="product-text">
                <h1 className="product-name-dp">{this.state.product.name}</h1>
                <p className="short-desc-dp">{this.state.product.shortDescription}</p>
                <h3 className="product-price-dp">${(this.state.product.price / 100).toFixed(2)}</h3>
              </div>
              <div className="add-to-bag d-flex align-items-center justify-content-center"
                onClick={() => this.addToCart(this.state.product)}>
                <h4>+ Add to bag</h4>
              </div>
            </div>
            <div className="col-lg-8 col-12 d-flex align-items-center justify-content-center prod-img-dsc-pg ">
              <img src={this.state.product.image} alt="" />
            </div>
          </div>
        </>
      );
    }
  }
}

export default ProductDetails;
