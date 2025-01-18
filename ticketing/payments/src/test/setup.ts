import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    var signin: (id?: string) => string[];
  }

jest.mock('../nats-wrapper.ts');

process.env.STRIPE_KEY = 'sk_test_51QiZLTFg56OMjG6cW2DlYXisQqijJP5vnPgI17HdNV55dWhXWqRKdFSHSn0gza0CUrnjvJLkKWh3zM2XkCcn4xJi00ZyZnpyyb'

let mogo: any;
beforeAll(async () => {
    process.env.JWT_KEY = "asdf";
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    jest.clearAllMocks();
    if(mongoose.connection.db){
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
    if(mogo){
        await mogo.stop();
    }
    await mongoose.connection.close();
}); 

global.signin = function (id?: string) {
     const payload = {
            id: id || new mongoose.Types.ObjectId().toHexString(),
            email: 'test@test.com'
        };
        const token = jwt.sign(payload, process.env.JWT_KEY!);

        const session = { jwt: token };
        const sessionJSON = JSON.stringify(session);
        const base64 = Buffer.from(sessionJSON).toString('base64');
        return [`session=${base64}`];
}
