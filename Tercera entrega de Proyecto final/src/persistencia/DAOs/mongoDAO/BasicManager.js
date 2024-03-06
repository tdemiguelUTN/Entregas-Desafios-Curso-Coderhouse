export default class BasicManager {
    constructor(model,populateOption) {
      this.model = model;
      this.populateOption = populateOption;
    }
  
    async findAll(obj) {
      return this.model.find(obj).populate(this.populateOption);
    }
  
    async findById(id) {
      return this.model.findById(id).populate(this.populateOption);
    }
  
    async createOne(obj) {
      return this.model.create(obj);
    }
  
    async updateOne(id, obj) {
      return this.model.updateOne({ _id: id }, obj);
    }
  
    async deleteOne(id) {
      return this.model.deleteOne({ _id: id });
    }
  }