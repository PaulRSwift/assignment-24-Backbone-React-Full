const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// DATA TABLE
// ----------------------
const resourceSchema = new Schema({
  // example of optional fields
  todoItem:        { type: String, required: true },


})



module.exports = {
   /*
    * NOTE: you would ideally change the export-value and the model-name
    */
  Resource: createModel('Resource', resourceSchema)
}
