import { createClient } from 'redis'

const redisClient = createClient({
  url: "redis://localhost:6379"
})
redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});


export async function RedisConnect() {
  // Connect to Redis
  await redisClient.connect();

  // Set a key-value pair
  await redisClient.set('myKey', 'myValue');

  // Get the value of a key
  const value = await redisClient.get('myKey');
  // console.log('Value of myKey:', value);

  // Close the connection
  await redisClient.quit();
}
