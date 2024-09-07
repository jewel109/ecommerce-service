import { creatingKafkaInstance, KafkaCustomConfig } from "../../../utils/kafkaUtils"

const config: KafkaCustomConfig = {
  clientId: "payment",
  broker: ["localhost:9092"]
}

export const kafkaInstance = creatingKafkaInstance(config)

