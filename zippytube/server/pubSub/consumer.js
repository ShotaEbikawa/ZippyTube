const {Kafka} = require('kafkajs');
const URL = 'ws://localhost:4000/websocket';
const FeedMethods = require('../methods/FeedMethods');

consumeMessage();
async function consumeMessage() {
    try {
        const kafka = new Kafka({
            "clientId": "feed",
            "brokers": ["ip-172-31-9-106:9092"]
        });
        const consumer = kafka.consumer({"groupId": "test"});
        console.log("Connecting...")
        await consumer.connect()
        console.log("Connected!!!")

        await consumer.subscribe({
            "topic": 'video',
            "fromBeginning": true,
        })
        await consumer.run({
            "eachMessage": async result => {
                let feedObj = JSON.parse(result.message.value)
                console.log(`${feedObj.token} ${feedObj.msg} is sent`);
                FeedMethods.addFeed(`${feedObj.token}`,`${feedObj.msg}`);
            }
        })
    } 
    finally {
        console.log('it is working');
    }
}


module.exports = consumeMessage;