const express = require("express");
const app = express();
const cors = require("cors");
const { recoverPublicKey } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { sha256 } = require("ethereum-cryptography/sha256");

const {
  hexToBytes,
  toHex,
  utf8ToBytes,
} = require("ethereum-cryptography/utils");

const port = 3042;

app.use(cors());
app.use(express.json());

/**
 * 
 * These are the accounts which is going to be used in the task
 * 
 * Adresses are calculated just like Etherium does
 * 
 *Private key fae27b265c8b933cc2210076547c190110244472ef4defe2c73c76f4142a2c6a 
 *publicKey 0420cc3478e05fe7e6d746e9736db72c20360319592151825889f5b4128709b0d0ba7cc92b3b0c414d46697d59ee07f32e6162a95aae4e3fbfbc343a2d7e50756e 
 address 0xfee7c627eebc53e5185caaee92bee871158e4299
 *
 *Private key 85862e6b1b3528a32dbce7590a197d7b025f086b728acbdcdc804dd4402e3efb 
 publicKey 04ada7122f82eba6350fd90208ba8e53b8b339459bda1dc1d1e8c723ffaadaed950c1b8f2b8eacba2f3fba27985af70535e800ce682f85c8bb31b287c52ebad59a 
 address 0x1958cd5ba9302e9c067e56d3bca705e67768316e
 * Private key 58a8f7b2b1c486696c8a5cb44b1a9c67217f26d27e6246009cfc309aa7e37287 
 * publicKey 04171f6434957b9ee55f50a04e7c2104096017d1b3be76a627fe39bdea7bb0b318431669db7fb975764a395998da5ea81dabfc4785c1dcbfbeebb0d5b671bcf6e0 
 * address 0xeb77dc8bfec7bc141203efb3f055ee4069c0bb3a
 */

const balances = {
  "0xfee7c627eebc53e5185caaee92bee871158e4299": 100,
  "0x1958cd5ba9302e9c067e56d3bca705e67768316e": 50,
  "0xeb77dc8bfec7bc141203efb3f055ee4069c0bb3a": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

/**
 *
 * Using recoverPublicKey getting public key and calculating sender address from signature and recovery key.
 * Comparing addresses to verify the sender.
 *
 * Timestamp is being used as nonce which comes form client
 *
 */

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoverKey, msgHash, nonce } =
    req.body;

  //Verify the signature

  setInitialBalance(sender);
  setInitialBalance(recipient);

  /** calculating senders public key for address verification */
  let senderPublicKey = recoverPublicKey(
    hexToBytes(msgHash),
    hexToBytes(signature),
    recoverKey
  );

  /** Sender address comparing */
  let senderAddress = `0x${toHex(
    keccak256(senderPublicKey.slice(1)).slice(12)
  )}`;
  if (senderAddress != sender)
    res.status(401).send({
      message:
        "Sender is not authorised for this transaction! Invalid Signature",
    });

  // Create Hash to compare hash
  let msg = {
    sender,
    amount,
    recipient,
    nonce,
  };
  let newCalHash = toHex(sha256(utf8ToBytes(JSON.stringify(msg))));
  console.log(msgHash, msg, newCalHash);
  if (newCalHash != msgHash) {
    res.status(400).send({
      message: "Invalid hash",
    });
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
