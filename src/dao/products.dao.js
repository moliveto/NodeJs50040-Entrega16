import producModel from "../models/product.model.js";

export default class Users {

    get = (params) => {
        return producModel.find(params);
    }

    getBy = (params) => {
        return producModel.findOne(params);
    }

    save = (doc) => {
        return producModel.create(doc);
    }

    update = (id, doc) => {
        return producModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {
        return producModel.findByIdAndDelete(id);
    }
}