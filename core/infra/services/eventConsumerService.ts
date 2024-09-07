import { Kafka, KafkaConfig } from "kafkajs";
import { creatingConsumer, creatingKafkaInstance, KafkaCustomConfig, subscribingAngConsumingMsg } from "../../../utils/kafkaUtils";

const config: KafkaCustomConfig = {
  clientId: "payment",
  broker: ["localhost:9092"]
}

const kafkaInstance = creatingKafkaInstance(config)
console.log("working  ..")
const consuming = async () => {

  try {

    console.log("running ...")

    const consumer = await creatingConsumer(kafkaInstance, 'payment')

    // console.log(consumer)

    await subscribingAngConsumingMsg(consumer, 'order', msg => {
      if (msg.key && msg.value) {
        console.log({
          key: JSON.parse(msg.key.toString()),
          value: JSON.parse(msg.value.toString())
        })
      } else {
        console.log("good")
      }

    })

  } catch (error) {
    console.log(error)
  }


}




consuming()
