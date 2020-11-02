'use strict';

class DataModel {
    constructor(schema) {
        this.schema = schema;
    };

    post(record) {
        let newRecord = new this.schema(record);
        return newRecord.save();
    };

    get(id) {
        if (id) {
            return this.schema.findById(id);
        }
        else {
            return this.schema.find({});
        }
    };

    update(id, newData) {
        return this.schema.findOneByIdAndUpdate(id, newData);
    };

    delete(id) {
        this.schema.findOneByIdAndDelete(id);
    };
}

module.exports = DataModel;