import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})
describe("Testing Kafka Connection ", () => {

  test("should connect to kafka", async () => {

    const producer = kafka.producer();
    await producer.connect();

    // Expect producer to be connected
    expect(producer).toHaveProperty('connect');
    // expect(producer.connect).toBe(true);

    // Produce a message
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS' },
      ],
    });
    const consumer = kafka.consumer({ groupId: 'test-group' });
    await consumer.connect();

    // Expect consumer to be connected
    expect(consumer).toHaveProperty('connect');

    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    // Consume the message
    const messages = [];
    const messagePromise = new Promise<void>((resolve) => {
      consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          messages.push(message.value.toString());
          resolve(); // Resolve the promise once the message is consumed
        },
      });
    });    // Expect the message to be consumed

    await messagePromise
    expect(messages).toContain('Hello KafkaJS');

    await producer.disconnect()
    await consumer.disconnect()
  })
})
