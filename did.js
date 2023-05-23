import { Message } from "didcomm-node"; // or 'didcomm-node' if using Node.js
import { ExampleDIDResolver } from "./did-resolver.js";
import {
    ALICE_DID,
    ALICE_DID_DOC,
    ALICE_SECRETS,
    BOB_DID,
    BOB_DID_DOC,
    BOB_SECRETS,
} from "./data.js";

import { ExampleSecretsResolver } from "./secret-resolver.js";
import { getDidDDoc } from "./queryKilt.js";
import { generateKeypairs } from "./generateKeyPairs.js";

async function main() {
    // const ALICE_DID =
    //     "did:kilt:4sfZQywLppVCRPfnDdMauGrRZo68MXhg8jsxbB8KAwFGJ7EZ";
    // const BOB_DID = "did:kilt:4qNNHmAYk4Y6oLBtaBcBDsTrzJCUYgjDQaS9xs7xoYQ6TZNt";

    const msg = new Message({
        id: "1234567890",
        typ: "application/didcomm-plain+json",
        type: "http://example.com/protocols/lets_do_lunch/1.0/proposal",
        from: ALICE_DID,
        to: [BOB_DID],
        created_time: 1516269022,
        expires_time: 1516385931,
        body: { messagespecificattribute: "and its value" },
    });

    // let ALICE_DID_DOC = await getDidDDoc(
    //     "did:kilt:4sfZQywLppVCRPfnDdMauGrRZo68MXhg8jsxbB8KAwFGJ7EZ"
    // );
    // let BOB_DID_DOC = await getDidDDoc(
    //     "did:kilt:4qNNHmAYk4Y6oLBtaBcBDsTrzJCUYgjDQaS9xs7xoYQ6TZNt"
    // );

    // ALICE_DID_DOC.verficationMethod = {
    //     ...ALICE_DID_DOC.assertionMethod,
    //     id: ALICE_DID,
    // };
    // ALICE_DID_DOC.id = ALICE_DID;
    // delete ALICE_DID_DOC.assertionMethod;

    // BOB_DID_DOC.verficationMethod = {
    //     ...BOB_DID_DOC.assertionMethod,
    //     id: BOB_DID,
    // };
    // BOB_DID_DOC.id = BOB_DID;
    // delete BOB_DID_DOC.assertionMethod;
    // console.log("didDoc1 is\n", BOB_DID_DOC.assertionMethod);
    // console.log("didDoc2 is\n", ALICE_DID_DOC.verficationMethod[0]);

    // const { authentication, keyAgreement: ALICE } = await generateKeypairs(
    //     "trumpet tray cost dolphin among youth video camera mother flavor fuel monster"
    // );
    // const { keyAgreement: BOB } = await generateKeypairs(
    //     "ring bomb robust title junior prosper pride already buffalo very heart spice"
    // );
    // console.log("ALICE is\n", authentication.toJson());
    // const ALICE_SECRET = { ...ALICE.secretKey, id: ALICE_DID };

    // const base64Encoded = btoa(String.fromCharCode.apply(null, ALICE_SECRET));
    // console.log("base64Encoded is\n", base64Encoded);

    // const BOB_SECRET = BOB.secretKey;

    // const decode = new TextDecoder();

    // console.log("authentication is\n", authentication);
    // console.log("keyAgreement is\n", decode.decode(.publicKey));
    let didResolver = new ExampleDIDResolver([ALICE_DID_DOC, BOB_DID_DOC]);
    console.log("didResolver is\n", didResolver);
    let secretsResolver = new ExampleSecretsResolver(ALICE_SECRETS);
    // console.log("secretsResolver is\n", secretsResolver);
    const [encryptedMsg, encryptMetadata] = await msg.pack_encrypted(
        BOB_DID,
        ALICE_DID,
        null,
        didResolver,
        secretsResolver,
        {
            forward: false, // Forward wrapping is unsupported in current version
        }
    );

    console.log("Encryption metadata is\n", encryptMetadata);

    // --- Send message ---
    console.log("Sending message\n", encryptedMsg);

    // --- Unpacking message ---
    didResolver = new ExampleDIDResolver([ALICE_DID_DOC, BOB_DID_DOC]);
    secretsResolver = new ExampleSecretsResolver(BOB_SECRETS);

    const [unpackedMsg, unpackMetadata] = await Message.unpack(
        encryptedMsg,
        didResolver,
        secretsResolver,
        {}
    );

    console.log("Receved message is\n", unpackedMsg.as_value());
    console.log("Receved message unpack metadata is\n", unpackMetadata);
}
main()
    .then(() => console.log("done"))
    .catch((err) => console.log(err));
