const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('User API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a user', async () => {
        const res = await request(app)
            .post('/api/worko/user')
            .send({
                email: 'test@test.com',
                name: 'Test User',
                age: 30,
                city: 'Test City',
                zipCode: '12345'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should fetch all users', async () => {
        const res = await request(app).get('/api/worko/user');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should fetch a user by ID', async () => {
        const user = await request(app)
            .post('/api/worko/user')
            .send({
                email: 'test2@test.com',
                name: 'Test User 2',
                age: 28,
                city: 'Test City 2',
                zipCode: '54321'
            });

        const res = await request(app).get(`/api/worko/user/${user.body.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', user.body.id);
    });

    it('should update a user', async () => {
        const user = await request(app)
            .post('/api/worko/user')
            .send({
                email: 'test3@test.com',
                name: 'Test User 3',
                age: 26,
                city: 'Test City 3',
                zipCode: '67890'
            });

        const res = await request(app)
            .put(`/api/worko/user/${user.body.id}`)
            .send({
                name: 'Updated User 3',
                age: 27
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Updated User 3');
        expect(res.body).toHaveProperty('age', 27);
    });

    it('should soft delete a user', async () => {
        const user = await request(app)
            .post('/api/worko/user')
            .send({
                email: 'test4@test.com',
                name: 'Test User 4',
                age: 25,
                city: 'Test City 4',
                zipCode: '09876'
            });

        const res = await request(app).delete(`/api/worko/user/${user.body.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User soft deleted');
    });
});
