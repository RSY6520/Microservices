import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'testa@gmail.com',
            password: 'password'
        })
        .expect(400);
}
);

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@gmail.com',
            password: 'password'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@gmail.com',
            password: 'passworda'
        })
        .expect(400);
    }
);