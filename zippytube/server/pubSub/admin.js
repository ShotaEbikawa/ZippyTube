const {Kafka} = require('kafkajs');
const producer  = require('./producer');
async function createTopic(token,msg,type) {
    try {
        const kafka = new Kafka({
            "clientId": "feed",
            "brokers": ["shotaebikawa.local:9092"]
        });
        const admin = kafka.admin();
        console.log("Connecting...")
        await admin.connect()
        console.log("Connected!!!")
        await admin.createTopics({
            "topics": [{
                "topic": 'video',
                "numPartitions": 1
            }]
        })
        console.log("Created Successfully!!!");
        switch(type) {
            case 'video':
                producer(token,msg);
        }
        await admin.disconnect();
    } catch(ex) {
        console.log(`Something bad happened ${ex}`)
    }
}

module.exports = createTopic;