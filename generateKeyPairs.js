import * as Kilt from "@kiltprotocol/sdk-js";
import {
    blake2AsU8a,
    keyExtractPath,
    keyFromPath,
    mnemonicGenerate,
    mnemonicToMiniSecret,
    sr25519PairFromSeed,
} from "@polkadot/util-crypto";
import { generateAccount } from "./generateAccount.js";

function generateKeyAgreement(mnemonic) {
    const secretKeyPair = sr25519PairFromSeed(mnemonicToMiniSecret(mnemonic));
    const { path } = keyExtractPath("//did//keyAgreement//0");
    const { secretKey } = keyFromPath(secretKeyPair, path, "sr25519");
    return Kilt.Utils.Crypto.makeEncryptionKeypairFromSeed(
        blake2AsU8a(secretKey)
    );
}

export async function generateKeypairs(mnemonic = mnemonicGenerate()) {
    const { account } = await generateAccount(mnemonic);
    const authentication = {
        ...account.derive("//did//0"),
        type: "sr25519",
    };

    const keyAgreement = generateKeyAgreement(mnemonic);

    // const auth = new TextEncoder().encode(authentication);
    // console.log("authentication", authentication);
    // console.log("keyAgreement", keyAgreement);
    return {
        authentication: authentication,
        keyAgreement: keyAgreement,
    };
}
generateKeypairs();
