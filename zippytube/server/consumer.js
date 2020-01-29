const {Kafka} = require('kafkajs');
run();
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "feed",
            "brokers": ["shotaebikawa.local:9092"]
        });
        const consumer = kafka.consumer({"groupId": "test"});
        console.log("Connecting...")
        await consumer.connect()
        console.log("Connected!!!")

        consumer.subscribe({
            "topic": 'video',
            "fromBeginning": true,
        })
        await consumer.run({
            "eachMessage": async result => {
                console.log(`${result.message.value} is sent`)
            }
        })
    } 
    finally {
        console.log('it is working');
    }
}