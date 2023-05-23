import * as Kilt from "@kiltprotocol/sdk-js";
import axios from "axios";

export async function getDidDDoc(did) {
    await Kilt.connect("wss://peregrine.kilt.io/parachain-public-ws");

    const api = Kilt.ConfigService.get("api");

    // const encodedJohnDoeDetails = await api.call.did.queryByWeb3Name(
    //     "john_doe"
    // );

    // // This function will throw if johnDoeOwner does not exist
    // const {
    //     document: { uri },
    // } = Kilt.Did.linkedInfoFromChain(encodedJohnDoeDetails);
    // console.log(`My name is john_doe and this is my DID: "${uri}"`);

    const johnDoeDidDocument = await Kilt.Did.resolve(did);
    return johnDoeDidDocument?.document;
    // console.log(`John Doe's DID Document:`);
    // console.log(JSON.stringify(johnDoeDidDocument, null, 2));

    // const endpoints = johnDoeDidDocument?.document?.service;
    // if (!endpoints) {
    //     console.log("No endpoints for the DID.");
    //     return [];
    // }

    // console.log("Endpoints:");
    // console.log(JSON.stringify(endpoints, null, 2));
}
