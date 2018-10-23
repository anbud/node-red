const got = require('got')

const orgName = 'agileiot'

module.exports = function(RED) {
    function HFNode(config) {
        RED.nodes.createNode(this, config)

        this.on('input', (msg) => {
        	// get the token
        	got('users', {
			    baseUrl: 'http://localhost:4000',
			    headers: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    body: {
			        username: 'Andrej',
			        orgName: orgName
			    },
			    form: true
			}).then(data => {
    			if (data && data.body) {
        			data.body = JSON.parse(data.body)
        			// write data
        			got(`channels/${config.channel || 'sensors'}/chaincodes/${config.chaincode || 'sensorscc'}`, {
	                    baseUrl: 'http://localhost:4000',
	                    headers: {
	                        'authorization': `Bearer ${data.body.token}`,
	                        'content-type': 'application/json'
	                    },
	                    body: JSON.stringify({
	        		        peers: ['peer0.test.vlf.zx.rs'],
	        		        fcn: config.fcn || 'changeSensorValue',
	                        args: [config.id, msg.payload]
	    		        })
			        }).then(data => {})
        		}
        	})

            this.send(msg.payload) // return the same value you've received, idempotency
        })
    }

    RED.nodes.registerType('hf-write', HFNode)
}