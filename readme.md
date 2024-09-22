REST API server where Customer/Seller can be added by Admin. Customer can add product to cart for buying, make order, make checkout. Admin can add product to sell. There is notification system for Customer and Seller.

First copy the  `.env.example` to `./config/dev.env`

To run the dockerized **postgress** , **kafka zookeeper** , **elastic search** , **redis**
run this command
`docker compose up --build -d`

To install the dependencies run
`pnpm install`

To start the dev server run
`pnpm start:dev`

To test run
`npm test`

some test might not work
