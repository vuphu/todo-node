import database from '../../src/common/config/database';
import env from '../../src/common/config/env';
import mongoose from 'mongoose';
import UserService from '../../src/services/user';
import request from 'supertest';
import app from '../../src/common/config/app';
import faker from 'faker';
import httpStatus from 'http-status';
import helper from '../../src/common/helper';
import EventService from '../../src/services/event';

describe('Event Routes', () => {
  const userService = new UserService();
  const eventService = new EventService();
  let user;

  beforeAll(async () => {
    await database.ensureInitialized(env.mongoUriTest);
    await mongoose.connection.db.dropCollection('events');

    user = await userService.createUser({
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('test create event', async () => {
    const eventBody = {
      name: faker.name.findName(),
      startDate: Date.now(),
      dueDate: Date.now(),
      description: faker.lorem.words(30),
    };

    const error = await request(app).post('/events').send(eventBody);
    expect(error.statusCode).toBe(httpStatus.UNAUTHORIZED);

    const res = await request(app)
      .post('/events')
      .set('Authorization', `Bearer ${helper.generateJWT(user)}`)
      .send(eventBody);
    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body).toHaveProperty('name', eventBody.name);
    expect(res.body).toHaveProperty('description', eventBody.description);
  });

  test('test update event', async () => {
    const event = await eventService.createEvent({
      name: faker.name.findName(),
      startDate: Date.now(),
      dueDate: Date.now(),
      description: faker.lorem.words(30),
    });

    const eventId = event._id.toString();
    const updateBody = { name: faker.name.findName() };

    const error = await request(app).put(`/events/${eventId}`).send(updateBody);
    expect(error.statusCode).toBe(httpStatus.UNAUTHORIZED);

    const res = await request(app)
      .put(`/events/${eventId}`)
      .set('Authorization', `Bearer ${helper.generateJWT(user)}`)
      .send(updateBody);
    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body).toHaveProperty('name', updateBody.name);
    expect(res.body).toHaveProperty('description', event.description);
  });

  test('test delete event', async () => {
    const event = await eventService.createEvent({
      name: faker.name.findName(),
      startDate: Date.now(),
      dueDate: Date.now(),
      description: faker.lorem.words(30),
    });

    const eventId = event._id.toString();

    const error = await request(app).delete(`/events/${eventId}`).send();
    expect(error.statusCode).toBe(httpStatus.UNAUTHORIZED);

    const res = await request(app)
      .delete(`/events/${eventId}`)
      .set('Authorization', `Bearer ${helper.generateJWT(user)}`)
      .send();
    expect(res.statusCode).toBe(httpStatus.OK);
    expect(res.body).toHaveProperty('_id', eventId);
  });

  describe('test pagination', () => {
    let events = [];
    beforeAll(async () => {
      const mgo = eventService.eventRepository.mongo;
      await mgo.deleteMany();
      await mgo.insertMany(
        [...Array(20).keys()].map(i => ({
          name: faker.name.findName(),
          startDate: faker.date.past(),
          dueDate: faker.date.future(),
          description: faker.lorem.words(10),
        })),
      );
      events = await mgo.find().sort({ _id: -1 }).lean();
      console.log(events.map(e => e._id));
    });

    test('test paginate event - case 1', async () => {
      const res = await request(app).get(`/events`).query({ skip: 0, limit: 10 }).send();
      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.body).toHaveLength(10);
      expect(res.body[0]._id).toBe(events[0]._id.toString());
    });

    test('test paginate event - case 2', async () => {
      const res = await request(app).get(`/events`).query({ skip: 15, limit: 10 }).send();
      expect(res.statusCode).toBe(httpStatus.OK);
      expect(res.body).toHaveLength(5);
      expect(res.body[4]._id).toBe(events[19]._id.toString());
    });
  });
});
