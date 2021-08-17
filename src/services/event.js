import EventRepository from '../repositories/event';
import constant from '../common/constant';

export default class EventService {
  constructor() {
    this.eventRepository = new EventRepository();
  }

  async paginateEvents(filter, options) {
    const { skip, limit, sortBy, sortDescending = true } = options;
    const { name } = filter;

    const query = {};
    if (name) {
      query.$text = { $search: name };
    }

    return this.eventRepository.paginateEvents(query, {
      skip,
      limit,
      sortBy: sortBy ? { [sortBy]: sortDescending ? -1 : 1 } : null,
    });
  }

  async getEventById(id) {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw constant.errors.data.event_not_found;
    }
    return event;
  }

  async createEvent(event) {
    return this.eventRepository.create(event);
  }

  async updateEvent(id, data) {
    const event = await this.eventRepository.updateById(id, data);
    if (!event) {
      throw constant.errors.data.event_not_found;
    }
    return event;
  }

  async deleteEvent(id) {
    const event = await this.eventRepository.deleteById(id);
    if (!event) {
      throw constant.errors.data.event_not_found;
    }
    return event;
  }
}
