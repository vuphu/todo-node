export class BaseRepository {
  constructor(mongo) {
    this.mongo = mongo;
  }

  async create(data) {
    return this.mongo.create(data);
  }

  async findById(id) {
    return this.mongo.findById(id).lean();
  }

  async findOne(filter) {
    return this.mongo.findOne(filter).lean();
  }

  async updateById(id, data) {
    return this.mongo
      .findOneAndUpdate(id, data, {
        new: true,
      })
      .lean();
  }

  async exist(filter) {
    return this.mongo.exists(filter);
  }

  async deleteById(id) {
    return this.mongo.findByIdAndDelete(id);
  }
}
