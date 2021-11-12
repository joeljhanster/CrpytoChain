# Udemy Course: Build a Blockchain & Cryptocurrency | Full-Stack Edition


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