// connect mqtt server
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883', {
    username: 'minisong',
    password: 'qwe789'
})
var devicesWaitPermission = []
var messagePublished = false;
var json

//connect
client.on('connect', function () {
    console.log('MQTT client connected')
    // catch devices permission
    setInterval(() => {
        messagePublished = false
        client.subscribe('Lynx/permission')
    
    }, 1000);
})
client.on('error', function (error) {
    console.log(error)
})

client.on('message', function (topic, message) {
    if (topic == 'Lynx/permission') {
        var mes = message.toString()
        json = JSON.parse(mes)
        console.log(`${json.id}`);
        console.log('Received message:', message.toString(), 'on topic', topic)
        devicesWaitPermission.push(json)
        returnPermission()
    }
    console.log(`${topic}:${message.toString()}`);
    
})
// 
function returnPermission() {
    if (!messagePublished) {
        console.log(`Lynx/permission/${json.id}`);
        client.publish(`Lynx/permission/${json.id}`, `true`, { qos: 0, retain: false }, function (error) {
        client.subscribe(`Lynx/${json.id}`)
            if (error) {
                console.log(error)
            } else {
                client.subscribe(`Lynx/${json.id}`)
                messagePublished = true
                console.log('set message Published to true')
            }
        })
    }
}

function testButton(){
    console.log(`${input.value}`);
    if (input.value === 'false') {
    input.value = 'true';
    result.textContent = 'True';
  } else {
    input.value = 'false';
    result.textContent = 'False';
  }
}

module.exports = {
    testButton
}



