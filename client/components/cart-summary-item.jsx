import React from 'react';

function CartSummaryItem(props) {
  return (
    <div className= 'card'>
      <div className="d-flex card-body">
        <div className="col-4">
          <img className='card-img-top'src={props.image} alt=""/>
        </div>
        <div className="col-8 d-flex flex-column justify-content-center">
          <h2>{props.name}</h2>
          <h3 className='summary-price'>${(props.price / 100).toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );

}

export default CartSummaryItem;
