const PubNub = require("pubnub");

const credentials = {
  publishKey: "pub-c-32d686ff-6637-4e5f-bfb5-2037bba697bd",
  subscribeKey: "sub-c-f8c8b13e-47b9-11ec-96b3-4a48f5067549",
  secretKey: "sec-c-N2YxMDU3NTEtZjJkYi00MDkxLWJkYjQtNGQwZjcxOTg4YzA3"
};

const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
  TRANSACTION: "TRANSACTION"
};

class PubSub {
  constructor({ blockchain, transactionPool, wallet }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

    this.pubnub.addListener(this.listener());
  }

  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject;

        console.log(
          `Message received. Channel: ${channel}. Message: ${message}`
        );
      }
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}

module.exports = PubSub;
