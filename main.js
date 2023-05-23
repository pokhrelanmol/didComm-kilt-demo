import * as Kilt from "@kiltprotocol/sdk-js";
import axios from "axios";

async function main() {
    await Kilt.connect("wss://peregrine.kilt.io/parachain-public-ws");
    const api = Kilt.ConfigService.get("api");
    const johnDoeDidDocument = await Kilt.Did.resolve(
        "did:kilt:4sfZQywLppVCRPfnDdMauGrRZo68MXhg8jsxbB8KAwFGJ7EZ"
    );
    console.log(`John Doe's DID Document:`);
    console.log(JSON.stringify(johnDoeDidDocument, null, 2));

    const endpoints = johnDoeDidDocument?.document?.service;
    if (!endpoints) {
        console.log("No endpoints for the DID.");
        return [];
    }

    console.log("Endpoints:");
    console.log(JSON.stringify(endpoints, null, 2));
}

main()
    .then(() => {
        console.log("Done");
        process.exit(0);
    })
    .catch((e) => {
        console.log("Error", e);
        process.exit(1);
    });
