const Backbone = require('backbone');

const TodoModel = Backbone.Model.extend({
   url: '/api/todo/',
   idAttribute: "_id",
})

const TodoCollection = Backbone.Collection.extend({
   model: TodoModel,
   url: "/api/todo"
})


module.exports = {
   TodoModel,
   TodoCollection
}
