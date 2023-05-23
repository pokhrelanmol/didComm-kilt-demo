export class ExampleSecretsResolver {
    knownSecrets;

    constructor(knownSecrets) {
        this.knownSecrets = knownSecrets;
    }

    async get_secret(secretId) {
        const res = this.knownSecrets.find((secret) => secret.id === secretId);
        return res ? res : null;
    }

    async find_secrets(secretIds) {
        return secretIds.filter((id) =>
            this.knownSecrets.find((secret) => secret.id === id)
        );
    }
}

/* tslint:disable:max-classes-per-file */
export class MockSecretsResolver {
    getHandlers;
    findHandlers;
    fallback;

    constructor(getHandlers, findHandlers, fallback) {
        this.getHandlers = getHandlers;
        this.findHandlers = findHandlers;
        this.fallback = fallback;
    }

    async get_secret(secretId) {
        const handler = this.getHandlers.pop();

        return handler
            ? handler(secretId)
            : await this.fallback.get_secret(secretId);
    }

    async find_secrets(secretIds) {
        const handler = this.findHandlers.pop();

        return handler
            ? handler(secretIds)
            : await this.fallback.find_secrets(secretIds);
    }
}
