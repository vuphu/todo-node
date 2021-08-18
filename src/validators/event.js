import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

const paginateEvents = Joi.object({
  query: Joi.object().keys({
    sortBy: Joi.valid('startDate', 'dueDate'),
    skip: Joi.number(),
    limit: Joi.number(),
  }),
});

const getEventById = Joi.object({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
});

const createEvent = Joi.object({
  body: Joi.object().keys({
    name: Joi.string().required(),
    startDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    description: Joi.string().required(),
  }),
});

const updateEvent = Joi.object({
  body: Joi.object().keys({
    name: Joi.string(),
    startDate: Joi.date(),
    dueDate: Joi.date(),
    description: Joi.string(),
  }),
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
});

const deleteEvent = Joi.object({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
});

export default {
  paginateEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
