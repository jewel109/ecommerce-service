
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
