const Wallet = require(".");
const Transaction = require("./transaction");
const Blockchain = require("../blockchain");
const { verifySignature } = require("../util");
const { STARTING_BALANCE } = require("../config");

describe("Wallet", () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  // Has a balance
  it("has a `balance`", () => {
    expect(wallet).toHaveProperty("balance");
  });

  // Has a public key
  it("has a `publicKey`", () => {
    expect(wallet).toHaveProperty("publicKey");
  });

  describe("signing data", () => {
    const data = "foobar";

    it("verifies a signature", () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: wallet.sign(data)
        })
      ).toBe(true);
    });

    it("does not verify an invalid signature", () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: new Wallet().sign(data)
        })
      ).toBe(false);
    });
  });

  describe("createTransaction()", () => {
    describe("and the amount exceeds the balance", () => {
      it("throws an error", () => {
        expect(() =>
          wallet.createTransaction({
            amount: 999999,
            recipient: "foo-recipient"
          })
        ).toThrow("Amount exceeds balance");
      });
    });

    describe("and the amount is valid", () => {
      let transaction, amount, recipient;

      beforeEach(() => {
        amount = 50;
        recipient = "foo-recipient";
        transaction = wallet.createTransaction({
          amount,
          recipient
        });
      });
      it("creates an instance of `Transaction`", () => {
        expect(transaction instanceof Transaction).toBe(true);
      });

      it("matches the transaction input with the wallet", () => {
        expect(transaction.input.address).toEqual(wallet.publicKey);
      });

      it("outputs the amount the recipient", () => {
        expect(transaction.outputMap[recipient]).toEqual(amount);
      });
    });

    describe("and a chain is passed", () => {
      it("calls `Wallet.calculateBalance`", () => {
        const calculateBalanceMock = jest.fn();

        const originalCalculateBalance = Wallet.calculateBalance;

        Wallet.calculateBalance = calculateBalanceMock;

        wallet.createTransaction({
          recipient: "foo",
          amount: 10,
          chain: new Blockchain().chain
        });

        expect(calculateBalanceMock).toHaveBeenCalled();

        Wallet.calculateBalance = originalCalculateBalance;
      });
    });
  });

  describe("calculateBalance()", () => {
    let blockchain;

    beforeEach(() => {
      blockchain = new Blockchain();
    });

    describe("and there are no outputs for the wallet", () => {
      it("returns the `STARTING_BALANCE`", () => {
        expect(
          Wallet.calculateBalance({
            chain: blockchain.chain,
            address: wallet.publicKey
          })
        ).toEqual(STARTING_BALANCE);
      });
    });

    describe("and there are outputs for the wallet", () => {
      let transactionOne, transactionTwo;

      beforeEach(() => {
        transactionOne = new Wallet().createTransaction({
          recipient: wallet.publicKey,
          amount: 50
        });

        transactionTwo = new Wallet().createTransaction({
          recipient: wallet.publicKey,
          amount: 60
        });

        blockchain.addBlock({ data: [transactionOne, transactionTwo] });
      });

      it("adds the sum of all outputs to the wallet balance", () => {
        expect(
          Wallet.calculateBalance({
            chain: blockchain.chain,
            address: wallet.publicKey
          })
        ).toEqual(
          STARTING_BALANCE +
            transactionOne.outputMap[wallet.publicKey] +
            transactionTwo.outputMap[wallet.publicKey]
        );
      });

      describe("and the wallet has made a transaction", () => {
        let recentTransaction;

        beforeEach(() => {
          recentTransaction = wallet.createTransaction({
            recipient: "foo-address",
            amount: 30
          });

          blockchain.addBlock({ data: [recentTransaction] });
        });

        it("returns the output amount of the recent transaction", () => {
          expect(
            Wallet.calculateBalance({
              chain: blockchain.chain,
              address: wallet.publicKey
            })
          ).toEqual(recentTransaction.outputMap[wallet.publicKey]);
        });

        describe("and there are outputs next to and after the recent transaction", () => {
          let sameBlockTransaction, nextBlockTransaction;

          beforeEach(() => {
            // Miner create a transaction (output)
            recentTransaction = wallet.createTransaction({
              recipient: "later-foo-address",
              amount: 60
            });

            // Miner block
            sameBlockTransaction = Transaction.rewardTransaction({
              minerWallet: wallet
            });

            // Mine new blockp
            blockchain.addBlock({
              data: [recentTransaction, sameBlockTransaction]
            });

            // Miner receives transaction from another wallet
            nextBlockTransaction = new Wallet().createTransaction({
              recipient: wallet.publicKey,
              amount: 75
            });

            blockchain.addBlock({
              data: [nextBlockTransaction]
            });
          });

          it("includes the output amount in the returned balance", () => {
            expect(
              Wallet.calculateBalance({
                chain: blockchain.chain,
                address: wallet.publicKey
              })
            ).toEqual(
              recentTransaction.outputMap[wallet.publicKey] + // balance after recent transaction
              sameBlockTransaction.outputMap[wallet.publicKey] + // mining reward
                nextBlockTransaction.outputMap[wallet.publicKey] // amount received from another wallet
            );
          });
        });
      });
    });
  });
});
