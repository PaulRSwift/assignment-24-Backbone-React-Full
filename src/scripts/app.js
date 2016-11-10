
const ReactDOM = require('react-dom');
const React = require('react');
const Backbone = require('backbone');

const {TodoModel, TodoCollection} = require('./models.js')



document.querySelector('#app-container').innerHTML = `<h1>YOLO</h1>`



const HomeView = React.createClass({


getInitialState: function(){
      let startingStateObj = {
         todos: this.props.todoDataColl

      }
      return startingStateObj
   },

componentWillMount: function(){
   let self = this;
   Backbone.Events.on('save-new-record', function(modAttributes){
      console.log('event', modAttributes);
      let newMod = new TodoModel()
      newMod.set(modAttributes)
      newMod.save().then(function(serverRes){

         let newColl = new TodoCollection()
         newColl.fetch().then(function(){
            self.setState({todos: newColl})
         })
      })

   })
},


   _handleKeyDown: function(evt){
     if(evt.key == 'Enter'){
       console.log(this.refs.taskInputEl.value)

       let currentInput = this.refs.taskInputEl.value
         this.refs.taskInputEl.value = ''
       let newTaskObj = {}

        if( currentInput.length > 0  ) {

            newTaskObj = {
               todoItem: currentInput,
               completed:false
            }
             Backbone.Events.trigger('save-new-record', newTaskObj)
         }
      }
   },

   _removeTask: function (evt){
      console.log(evt.props);

      let text = evt._targetInst._hostParent._hostNode.textContent
      let newState = this.state

      let newArray = newState.todos.filter(function(el){
         console.log("text", el.text, text);
         return (el.text + 'X') !== text
      })
      console.log("test", newArray);

      this.setState({
         todos: newArray
      })
   },

   _addSubmission: function(evt){

    let stuffToDo = this.refs.taskInputEl.value

    let newRecordData = {
         todoItem: stuffToDo,

      }
   },

   render: function(){
      var self = this
      console.log("state.todos", this.state.todos);
      let list = this.state.todos.map(function(todoMod, i){
         return <li key={i}>{todoMod.get('todoItem')}<button className= "removeBtn" onClick={self._removeTask}>X</button></li>
      })

      return (
         <div className="container text-center">
            <button className="btn btn-info myBtn" > All</button>
            <button className="btn btn-info myBtn" > Done</button>
            <button className="btn btn-info myBtn" > Undone</button>
               <br/>
            <input type="text" className="form-control input-group-lg" ref="taskInputEl" onKeyDown={this._handleKeyDown} placeholder="" aria-describedby="basic-addon1"/>

            <ul className="list-group">
               { list }
            </ul>
         </div>
      )
   }
})

let todoCollInstance = new TodoCollection

todoCollInstance.fetch().then(function(){
   console.log(todoCollInstance);

   ReactDOM.render(<HomeView todoDataColl={todoCollInstance}/>, document.querySelector('#app-container'))

})
