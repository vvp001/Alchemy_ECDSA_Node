import { useRef, useState } from "react";
import { sha256 } from "ethereum-cryptography/sha256";
import { sign } from "ethereum-cryptography/secp256k1";
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils";

import server from "./server";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  /**
   * Creating nonce from timestamp because there is nothing to keep track of nonce. Ideally wallet take care of it.
   * Signing the data and sending signature and recovery bit along with request for validation
   * @param {} evt
   */
  async function transfer(evt) {
    evt.preventDefault();
    let nonce = Date.now();
    try {
      let msg = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        nonce,
      };
      let msgHash = sha256(utf8ToBytes(JSON.stringify(msg)));
      let [signature, recoverKey] = await sign(
        msgHash,
        hexToBytes(privateKey),
        {
          recovered: true,
        }
      );
      console.log(signature, recoverKey);
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature: toHex(signature),
        recoverKey,
        msgHash: toHex(msgHash),
        nonce,
      });
      setBalance(balance);
    } catch (ex) {
      console.log(ex);
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        PrivateKey
        <input
          placeholder="Type your private key"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
