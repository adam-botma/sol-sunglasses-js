require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  select "productId",
  "name",
  "price",
  "image",
  "shortDescription"
  from "products";
  `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({ error: 'productId must be a positive integer' });
  }
  const sql = `
  select *
  from "products"
  where "productId" = $1;`;
  db.query(sql, [productId])
    .then(response => {
      const currentProduct = response.rows[0];
      if (!currentProduct) {
        next(new ClientError(`a product with ID ${productId} does not exist`, 404));
      } else {
        res.status(200).json(response.rows[0]);
      }
    })
    .catch(err => next(err));

});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(200).json([]);
  }
  const getAllCartItems = `
  select "c"."cartItemId",
       "c"."price",
       "p"."productId",
       "p"."image",
       "p"."name",
       "p"."shortDescription"
  from "cartItems" as "c"
  join "products" as "p" using ("productId")
 where "c"."cartId" = $1
  `;
  db.query(getAllCartItems, [req.session.cartId])
    .then(response => res.status(200).json(response.rows));

});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({ error: 'productId must be a positive integer' });
  }
  const checkForPriceSQL = `
  select "price"
  from "products"
  where "productId" = $1;
  `;

  db.query(checkForPriceSQL, [productId])
    .then(response => {
      if (!response.rows[0]) {
        next(new ClientError(`a product with ID: ${productId} does not exist`, 404));
      }
      const price = response.rows[0].price;
      const newRowSQL = `
      insert into "carts" ("cartId", "createdAt")
      values (default, default)
      returning "cartId";
      `;
      if (req.session.cartId) {
        const currentInfo = { productPrice: price, cartId: req.session.cartId };
        return currentInfo;
      }
      return db.query(newRowSQL)
        .then(response => {
          const newInfo = { productPrice: price, cartId: response.rows[0].cartId };
          return newInfo;
        });

    })
    .then(newInfo => {
      if (!req.session.cartId) {
        req.session.cartId = newInfo.cartId;
      }
      const cartItemsSQL = `
      insert into "cartItems" ("cartId", "productId", "price")
      values ($1, $2, $3)
      returning "cartItemId";`;
      return db.query(cartItemsSQL, [newInfo.cartId, productId, newInfo.productPrice]);
    })
    .then(response => {

      const cartItemInfoSQL = `
      select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
      where "c"."cartItemId" = $1;
      `;
      return db.query(cartItemInfoSQL, [response.rows[0].cartItemId])
        .then(response => res.status(201).json(response.rows[0]));
    })
    .catch(err => next(err));

});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
