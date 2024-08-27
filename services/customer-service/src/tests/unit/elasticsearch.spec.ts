import { Client } from "@elastic/elasticsearch"


console.log("node env ", process.env.NODE_ENV)
describe("Testing Elastic search db connection", () => {


  test("should connect to elastic db", async () => {

    const client = new Client({ node: 'http://localhost:9200' })
    expect(client).toBeDefined();
    const health = await client.cluster.health();
    expect(health).toHaveProperty('status');


    const indexExists = await client.indices.exists({ index: 'test-index' });
    console.log(indexExists)
  })
})
