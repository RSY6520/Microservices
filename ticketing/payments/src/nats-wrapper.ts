import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
    private _client?: Stan

    get client() {
        if(!this._client){
            throw new Error("Cannot access nats client before connecting");
        }
        return this._client;
    }

    connct(clusterId: string, clientId: string, url: string){
        this._client = nats.connect(clusterId, clientId, { url });

        return new Promise<void>((resolve, reject) => {
            this.client!.on('connect', () => {
                console.log("Connectes to NATS");
                resolve();
            });
            this.client!.on('error', (error) => {
                reject(error);
            })
        });
    }

}

export const natsWrapper = new NatsWrapper();