const {Kafka} = require('kafkajs');
const URL = 'ws://localhost:4000/websocket';
const FeedMethods = require('./methods/FeedMethods');
const ws = require('ws');
const wss = new ws.Server({port: 8000});
let wsDict = [];
wss.on('connection', ws=> {
    wsDict.push(ws);
});
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
                //wsDict[0].send(`${result.message.value}`);
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
