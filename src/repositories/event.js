import Event from '../models/event';
import { BaseRepository } from './repository';
import constant from '../common/constant';

export default class EventRepository extends BaseRepository {
  constructor() {
    super(Event);
    this.mongo = Event;
  }

  async paginateEvents(query, options) {
    const { skip, limit, sortBy } = options;
    return this.mongo
      .find(query)
      .sort(sortBy || { createdAt: -1 })
      .skip(skip || 0)
      .limit(limit || constant.limit.event_records)
      .lean();
  }
}
