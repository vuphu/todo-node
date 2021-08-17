import database from '../../src/common/config/database';
import env from '../../src/common/config/env';
import app from '../../src/common/config/app';
import request from 'supertest';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import constant from '../../src/common/constant';
import faker from 'faker';
import UserSchema from '../../src/models/user';

describe('User Routes', () => {
  const userBody = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };

  beforeAll(async () => {
    await database.ensureInitialized(env.mongoUriTest);
    await UserSchema.deleteOne({ username: userBody.username });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('test register', async () => {
    const res = await request(app).post('/register').send(userBody);
    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body).not.toHaveProperty('password');
    expect(res.body).toHaveProperty('username', userBody.username);
  });

  test('test register duplicate username', async () => {
    const res = await request(app).post('/register').send(userBody);
    expect(res.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('error', constant.errors.authenticate.user_already_exist);
  });

  test('test login', async () => {
    const res = await request(app).post('/login').send(userBody);
    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body).toHaveProperty('token');
  });
});
