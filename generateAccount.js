import { config as envConfig } from "dotenv";

import { mnemonicGenerate } from "@polkadot/util-crypto";

import * as Kilt from "@kiltprotocol/sdk-js";
import { waitReady } from "@polkadot/wasm-crypto";

async function generateAccount(mnemonic = mnemonicGenerate()) {
    await waitReady();
    const keyring = new Kilt.Utils.Keyring({
        ss58Format: 38,
        type: "sr25519",
    });
    return {
        account: keyring.addFromMnemonic(mnemonic),
        mnemonic,
    };
}
export { generateAccount };
// async function encryptAndDecryptMessage() {
//     await waitReady();

//     // Generate two new accounts
//     const { account: senderAccount, mnemonic: senderMnemonic } =
//         await generateAccount();

//     const { account: receiverAccount, mnemonic: receiverMnemonic } =
//         await generateAccount();

//     // Encrypt a message using the sender account's public key
//     const message = "Hello, world!";
//     const encryptedMessage = senderAccount.encryptMessage(message);
//     console.log("Encrypted message", encryptedMessage);

//     // Decrypt the message using the receiver account's private key
//     const decryptedMessage = receiverAccount.decryptMessage(encryptedMessage);
//     if (decryptedMessage !== null) {
//         const decodedMessage = new TextDecoder().decode(decryptedMessage);
//         console.log("Decrypted message", decodedMessage);
//     } else {
//         console.log("Failed to decrypt message");
//     }
// }

// encryptAndDecryptMessage();
