import { config as envConfig } from "dotenv";

import { mnemonicGenerate } from "@polkadot/util-crypto";

import * as Kilt from "@kiltprotocol/sdk-js";
import { generateKeypairs } from "./generateKeyPairs.js";

export async function generateLightDid(mnemonic = mnemonicGenerate()) {
    const { authentication, keyAgreement } = await generateKeypairs(
        "trumpet tray cost dolphin among youth video camera mother flavor fuel monster"
    );
    const lightDID = Kilt.Did.createLightDidDocument({
        authentication: [authentication],
        keyAgreement: [keyAgreement],
    });
    console.log("Light DID", lightDID);
}

generateLightDid();
// Don't execute if this is imported by another file.
// console.log(import.meta.url);
// if (import.meta.url === `file://${process.argv[1]}`) {
//     (async () => {
//         envConfig();

//         try {
//             await Kilt.init();

//             const mnemonic = mnemonicGenerate();
//             console.log("\nsave following to .env to continue\n");
//             console.log(`CLAIMER_DID_MNEMONIC="${mnemonic}"`);
//         } catch (e) {
//             console.log("Error while setting up claimer DID");
//             throw e;
//         }
//     })();
// }
