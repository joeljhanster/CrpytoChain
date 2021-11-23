# Udemy Course: Build a Blockchain & Cryptocurrency | Full-Stack Edition
Full-stack blockchain programming course! A backend + frontend with Node.js, Jest, Express, React, Heroku, & more!

### Section 2: Blocks | The Blockchain Backend
- [x] Set up the overall blockchain application
- [x] Created the basic building block of the blockchain - with blocks themselves!
- [x] Started a test-driven development approach to the project
- [x] Built the genesis block - to get the blockchain going
- [x] Added functionality to mine a block - create a new block for the blockchain
- [x] Developed the important sha-256 hash function
- [x] Applied the hash to mine a block

### Section 3: The Chain | The Blockchain Backend
- [x] Created the fundamental blockchain class
- [x] Devleoped functionality to validate the blockchain, to allow for chain replacement
- [x] Implemented chain replacement
- [x] Investigated stubbing consolue output in tests to keep the output clean

### Section 4: Proof of Work | The Blockchain Backend
- [x] Implemented the proof of work system by adding a difficulty and nonce value to each block
- [x] Adjusted the difficulty for a block to ensure that blocks are mined at a rate which approaches a set mining rate for the system
- [x] Investigated the proof of work system by writing a script which checked how will the dynamic difficulty adjusted the system to approach the mine rate
- [x] Switched the hexadecimal character-based difficulty criteria to a more fine-grained binary bit-based difficulty criteria
- [x] Prevented a potential difficulty jump attack by adding extra validation for the blockchain

### Section 5: API and Network | The Blockchain Backend
- [x] Set up an express API to allow for interaction to the backend through HTTP requests
- [x] Created a GET request to read the blockchain
- [x] Added a POST request to write new blocks to the blockchain
- [x] Implemented a real-time messaging network through Redis or PubNub
- [x] Added the ability to broadcast chains
- [x] Started peers through alternate ports, and broadcasted chains when blocks were mined through the api
- [x] Synchronized chains when new peers connected to the network
- [x] Optimized the implementation to avoid redundant interaction

### Section 6: Wallets, Keys and Transactions | The Cryptocurrency Backend
- [x] Created the core wallet class for the cryptocurrency
- [x] Devleoped the cryptographic key pair and public key addressing system
- [x] Implementing signature generation and verification to make transactions official
- [x] Built the main transaction class - with the output map and input structure
- [x] Developed functionality to actually validate transactions
- [x] Tied transaction creation with the wallet class
- [x] Allowed transactions to be updated with multiple outputs to efficiently use existing objects
- [x] Improved the hash function to recognize objects with new properties as changes in incoming data
- [x] Covered edge cases with transaction updates to prevent vulnerabilities

### Section 7: Transaction Pool | The Blockchain and Cryptocurrency Backend
- [x] Created the core transaction pool with an ability to set transactions
- [x] Handled transaction through the API, and added API-generated transactions to the pool
- [x] Made sure invalid transactions did not go to the pool
- [x] Handled updates to transactions through the API
- [x] Exposed a new API method to read the transaction pool data
- [x] Broadcasted transactions as they occurred through the API
- [x] Synced the transaction pool map as a network-dependent object like the blockchain

### Section 8: Mine Transactions | The Blockchain and Cryptocurrency Backend
- [x] Created the core transaction miner class to capture how miners should add transactions to the blockchain
- [x] Added the ability to grab valid transactions from the transaction pool
- [x] Added a way to clear blockchain transactions to ensure that only unique transaction objects could be recorded
- [x] Added a mining transactions endpoint to enable transaction mining through the API
- [x] Cleared recorded transactions on a successful replacement of the blockchain
- [x] Calculated the wallet balance based on the blockchain history
- [x] Applied these wallet balances whenever conducting a new transaction
- [x] Exposed the wallet information including the public key and balance through the API
- [x] Validated transaction data incoming into the blockchain
- [x] Valdiated incoming transaction input balances
- [x] Prevented duplicate transactions from appearing in a block's data
- [x] Validated the entire transaction itself when accepting new user-contributed blockchains

### Section 10: The Frontend Blockchain
- [x] Started serving a frontend page using the existing express server
- [x] Added JavaScript to the frontend
- [x] Built React into the frontend using parcel-bundler
- [x] Set up an efficient development workflow using parcel
- [x] Created the core App component to house the main React components
- [x] Used the fetch API to request backend data and serve it on the frontend
- [x] Visualized the blocks from the backend
- [x] Stylized the application to make it not look like a barebones skeleton HTML site
- [x] Created a block component that inherited data from the core Blocks component through props

### Section 11: The Frontend Cryptocurrency
- [x] Created toggle-able transaciton displays
- [x] Built a reusable frontend transaction component
- [x] Added routing for a multi-page application that renders different content based on the url
- [x] Support the conducting of transactions through a form
- [x] Posted transactions through the fetch API
- [x] Visualized the transaction pool - and added real-time polling capabilities
- [x] Added a way to mine a block through the frontend

# Notes
### Block
- timestamp: time at which block was created
- lastHash: hash of the previous block
- data: all the transactions, string / array etc.
- hash: generated from all its own data
- difficulty: determines number of leading zeros in hex/binary
- nonce: random number

### Test-Driven Development
1. Write some tests (red)
2. Write the code to get the tests to pass
3. Keep writing code until all tests pass (green)

- Confidence and reliability in code
- Speed up the coding process
- Learning opportunity

### Crypto Hash and SHA-256 (Secure Hash Algorithm 256)
Benefits of SHA-256
- Produces a unique value for unique input
- A one-way function (Data -> Hash)
- Only can crack it through guess and check method (costly)

### Chain Validation (concept of checking chain is built correctly)
1. Correct block fields present (timestamp, lastHash, data, hash)
2. Actual lastHash reference
3. Valid Hash (Regenerated hash {timestamp, data, lastHash} == hash)

### Chain Replacement (replace its chain with a new longer chain of valid blocks)
- Blockchain network: distributed and public, always updating the chain with the longest chain

### Proof of Work and the 51% Attack
- Spend computational power to mine a block (blockchain contributors)
- Affordable to add just one block, but to modify a chain of blocks is computationally expensive
- Proof of work system is inspired by Hashcash
- Difficulty --> Find a hash value and a number of leading 0s (e.g. Difficulty = 6 -> 000000xAsf213kds03d3m3)
- Block data + nonce (0... 1... 2...)
- Hexadecimal form: allows us to represent SHA-256 to (64 characters)
- Bitcoin: Binary form of the hash, leading zero bits, harder (256 characters in 256 bit binary string)

### Mining
timestamp, data, lastHash, hash, difficulty, nonce
Because of difficulty setting, they can control mining rate (if it is taking a long time for miners to add a new block, raise the difficulty, likewise if it is taking miners a while to mine new blocks, lower the difficulty)
Bitcoin has a goal of adding a new block every 10 minutes

### 51% Attack
- Evil Miner has at least 51% of the blockchain network's computational power
- Take over the blockchain
- Cost more than $9,000,000,000

### Dynamic Difficulty and Mine Rate
- Add blocks at reasonable and controlled pace
- Global value: MINE_RATE
- Compare timestamp between new block and last block (vs MINE_RATE)
- Difference > MINE_RATE (difficulty -= 1); Difference < MINE_RATE (diffculty += 1)

### Average work
- Average time of mining should be equals MINE_RATE

### Improve the proof of work system: Binary hashes
- HexToBinary

### Prevent difficulty jump (setting difficulty very low)
- Attackers can purposely set the difficulty to be very low (easily mine blocks) or very high (causes network to be very slow)

### Blockchain API
1. Read the Blockchain
2. Write to the Blockchain

Using Express (Node JS)
- HTTP Requests --> Get & Post Requests

### Set up Express
`npm i express@4.16.3 --save`
`npm i nodemon@1.18.4 --save-dev`
* Nodemon is an alternative node engine that runs the entire application after updates and file saves.

`npm i body-parser@1.18.3 --save`
* BodyParser is a middleware for express

### Real-Time Messaging Network through PubSub
Publisher broadcast message to the channel, subscriber focuses on listening to a set of channels
- Reduces overhead
Tracking Socket Addresses requires a huge amount of work

### Blokchain Pub/Sub
Blockchain channel
Publish blockchain data to blockchain channel, other nodes subscribes to blockchain channel
Use redis for the publisher subscriber capabilities

### PubSub options
1. Redis: tricky to set up, but dont need network connection if installed locally
2. PubNub: requires network connection

### Redis Pub/Sub
`npm i redis@2.8.0 --save`
Run redis-server in background: `redis-server --daemonize yes`

### PubNub Pub/Sub
`npm i pubnub@4.21.6 --save`

### Start Peers and Broadcast Chain on API Mine
Cross Environment: `npm i cross-env@5.2.0 --save-dev`

### Sync Chain on Connect
`npm i request@2.88.0 --save`
Get blocks and replace chain in blockchain for new peer nodes

### Wallets, Keys & Transactions Overview
Digital Wallet:
1. Balance Field
2. Wallet Keys (Private & Public)

Private keys allow users to create unique digital signature, they need to sign transactions
Public keys used to verify the signatures
Address is identical to its public keys

Transactions:
- Objects that contains information between transaction between two parties
- Input: provides details of the original sender (timestamp, balance, signature, sender's public key)
- Output: send money to others (amount & address)
- Output: send money to themselves, remaining balance output (amount, address)

Blocks in a chain will contian one of more of these transaction objects.
Therefore, every individual through the wallet can calculate their balance by looking at the history of transacitons in the blockchain.

Digital Signatures:
- Based on individual's two keys: Private and Public (unique string of numbers)
- With these keys, the use has the ability to sign data by creating a signature that is an encrypted hash value. (private key + transaction data = signature)
- Since value of hash is based on original data, any change will generate a unique hash value
- Anyone can use the public key of an individual who signed the data to then verify that signature
- Public key is used to decrypt the signature and read the data. If the data does not match the original data of the transaction, either the original data was tampered with after the data was signed by the sender, or the signature was generated with a private key that does not correspond with the public key, that is presented by the person who wants to do the transaction.

### Blockchain-powered Cryptocurrencies
1. Must contain wallet objects
2. Generate keys for digital signatures and verification
3. Have transactions objects to represent currency exchange between individuals

### Key Pair and Public Key Addresses
How key pairs are created, how signatures are done
`npm i elliptic@6.4.1 --save`

EC stands for Elliptic cryptography.
`secp256k1` algorithm
- SEC: Standards of Efficient Cryptography
- P: Prime
- 256: 256 bits
- K: Koblitz, a notable mathematician who significantly contributed to this algorithm
- 1: First implementation
- Prime number to generate a curve, which is 256 bits.

Avoid using `getPrivate()`

### Sign Data and Verifying Signatures
`indutny/elliptic`: Check readme

### Transaction Pool
This will allow transactions to be created and contributed by multiple users. Like the blockchain, the power of the cryptocurrency comes when there are multiple contributers. The transaction pool is a core object to facilitate that.

Data structure which is going to collect the transactions that are created by wallets throughout the network. It could be an array, map with key-value pairs etc.

3 Main Behaviours:
1. Unique set of transactions
2. Update existing stored transactions
3. Rewrite multiple transactions

Every node in the network is going to have their own instance of the transaction pool like the blockchain. The key is making sure that all of these transaction pools stay synchronized when one node creates a new transaction or updates an existing one, the transaction is going to have to be broadcasted to the entire network. Based on the transaction ID, it will either be added to each transaction pool if it's new or it's going to be updated if a transaction with that ID already exists.

The transaction pool is a great and useful object because it's going to enable miners to get an accurate list of recent transactions in order to include them within a new block. When looking to add a new block to the blockchain, a miner is going to use the transactions in the pool as the data for the new block to mine.

### Mine Transactions
What is a transaction miner?
- A transaction miner will do the job of mining new blocks whose data consists of a set of transactions.
- The transaction miner will get the blocks for the transaction pool.
- They're called miners because they are the individuals who pay the cost of computational power and do the work to find a valid hash for a new block.
- By adding a new block to the blockchain, the transaction miner will receive an official mining reward from the blockchain system. This reward is going to come in the form of a special transaction, that transaction will only have a single output, which will be for the miners wallet with an official mining reward value. The input is going to be a unique transaction input as well, that all the nodes are going to have the ability to recognize and validate.
- This mining reward helps motivate workers to keep mining new blocks to the chain. It ensures that new transactions will eventually get recorded so long as there are motivated miners to drive the overall system.
- Without the mining reward incentive, the blockchain growth will stagnate.

What functionality does a transaction miner need to achieve in order to properly mine a block of transactions?
5 Actions
1. Grab all the valid transactions in the pool
2. Generate a miner's reward to then include within a newly mined block
3. Do the CPU work to find a valid hash
4. Broadcast the updated blockchain to the entire network
5. Clear the transaction pool
   - `clear()`: the final step in the mine transaction's method
   - `clearBlockchainTransactions()`: what peers will call when they accept a new blockchain to be replaced, since it's a safer version of the clear() method and it doesn't have the chance of wiping away unaccounted for transactions in the local pool

### Calculate Balance
Balance is the network of a wallet rather than networth of a wallet in the cryptocurrency.
Initially, everyone is going to start out with the same starting balance, this help spur the economy.
In other official cryptocurrency, you may be able to start your starting balance to as many coins or as much cryptocurrency as you're willing to dish out real cash for.
In this system, we are giving everyone some play money to begin with. So that way the cryptocurrency can start going.
But on top of that, once a wallet starts receiving transactions officially from other wallets, it should add that received currency to its balance.

`calculateBalance()`: algorithm that can calculate the balance and figure out the wallet's value at any point in the blockchain history.
- Scan the entire blockchain and transaction history starting from the most recent block and going to the oldest one, which is the Genesis block.
- If the wallet has made no transactions in the blockchain history, then the wallet's balance is set to the official starting balance value.
- However, if the wallet has actually made a transaction, then the balance should be whatever is the output for that wallet.
- That output represents the remaining balance that is left over from the wallet after doing the transaction.
- Therefore, this transaction is a record of the blockchains official balance from that point onward.
- But there's also the case where the wallet is the recipient of one or more transactions.
- In this case, the wallet has even more value to their balance.
- The wallet gets to add any output amount sent to their address after their most recent transaction.
- If they receive another transaction after the recent transaction, they get to add that to the overall balance.
- But there's another case, let's say that the wallet now conducts another transaction. How should the wallet balance be calculated?
- Their balance should remain the output of their now newest, most recent transaction, even though they had other outputs in the overall blockchain history.
- So they can't add all the output amounts, meaning they don't get to add any output amounts freely that were recorded before their now most recent transaction.
- The reason is that once a wallet makes a transaction, they officially set their balance and include all the recent outputs in that balance value.
- So the wallet should be able to include those outputs again in a subsequent transaction or they're going to be double counted and the wallet will mistakenly report a balance that is much higher than its actual worth.
- So it's definitely not a good situation for anyone in the blockchain network. Everytime the wallet conducts a transaction, it uses up all the outputs that have been sent to it since the last transaction and it uses them permanently.
- That covers how the wallet balance will be calculated based on the blocks in history.

### Validate Transaction Blocks
`isValidChain()`:
- The genesis block is correct
- The lastHash reference is correct
- Block difficulty matches the hash leading 0's
- The generated hash matches the hash

`validTransactionData()`:
- Each transaction must be correctly formatted
- Only one mining reward per block
- Valid input amounts according balance in blockchain history
- Block must not have identical transactions (set of transactions with no duplicates)

### Deploying on Heroku
`heroku login`
`heroku create`: https://guarded-cliffs-20342.herokuapp.com/
`heroku addons:create heroku-redis:hobby-dev -a guarded-cliffs-20342`
`heroku addons:info redis-horizontal-56331`
`heroku addons:docs heroku-redis`
`git add -A`
`git commit -m "Configure Production Code`
`git push heroku main`
`heroku logs --tail`