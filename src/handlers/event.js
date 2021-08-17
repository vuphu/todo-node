import EventService from '../services/event';
import util from '../common/util';

const eventService = new EventService();

const paginateEvents = util.catchAsync(async (req, res) => {
  const { name, skip, limit, sortBy, sortDescending } = req.query;
  const events = await eventService.paginateEvents(
    { name },
    {
      skip: parseInt(skip, 0),
      limit: parseInt(limit, 0),
      sortBy,
      sortDescending: sortDescending === 'true',
    },
  );
  res.send(events);
});

const getEventById = util.catchAsync(async (req, res) => {
  const id = req.params.id;
  const event = await eventService.getEventById(id);
  res.send(event);
});

const createEvent = util.catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.send(event);
});

const updateEvent = util.catchAsync(async (req, res) => {
  const id = req.params.id;
  const event = await eventService.updateEvent(id, req.body);
  res.send(event);
});

const deleteEvent = util.catchAsync(async (req, res) => {
  const id = req.params.id;
  const event = await eventService.deleteEvent(id);
  res.send(event);
});

export default {
  paginateEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
