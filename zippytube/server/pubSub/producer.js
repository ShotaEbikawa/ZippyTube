const {Kafka} = require('kafkajs');
//produceMessage('lol','ok')
async function produceMessage(token,msg) {
    try {
        const kafka = new Kafka({
            "clientId": "feed",
            "brokers": ["shotaebikawa.local:9092"]
        });
        const producer = kafka.producer();
        console.log("Connecting...")
        await producer.connect();
        console.log("Connected!!!")
/*         await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        }) */
/*      let partition = msg[0] > "n" ? 1 : 0;
        console.log(msg[0],msg[0] > "N");
        console.log("N">"M",partition) */
        await producer.send({
            "topic": 'video',
            "messages": [
                {
                    'value': JSON.stringify({'msg': msg,'token':token}),
                }
            ]
        });
        console.log("Created Successfully!!!");
        await producer.disconnect();
    } catch(ex) {
        console.log(`Something bad happened ${ex}`)
    }
}

module.exports = produceMessage;