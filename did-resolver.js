export class ExampleDIDResolver {
    knownDids;

    constructor(knownDids) {
        this.knownDids = knownDids;
    }

    async resolve(did) {
        const res = this.knownDids.find((ddoc) => ddoc.id === did);
        return res ? res : null;
    }
}

/* tslint:disable:max-classes-per-file */
export class MockDIDResolver {
    handlers;
    fallback;

    constructor(handlers, fallback) {
        this.handlers = handlers;
        this.fallback = fallback;
    }

    async resolve(did) {
        const handler = this.handlers.pop();
        return handler ? handler(did) : await this.fallback.resolve(did);
    }
}
