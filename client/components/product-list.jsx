import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(err => console.error(err));

  }

  render() {
    if (!this.state.products[0]) {
      return <h1>loading.....</h1>;
    }
    return (
      <div className="container d-flex flex-wrap">
        {this.state.products.map(product => {
          return (
            <div className="col-12 col-sm-10 col-md-4" key={product.productId}>
              <ProductListItem name = {product.name}
                image={product.image} price ={product.price} shortDesc = {product.shortDescription} />
            </div>
          );
        })}

      </div>
    );
  }
}

export default ProductList;
