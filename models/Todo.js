const mongoose = require('mongoose');



const taskSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String,

  },
  deadline: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: true
  },
  assignedUser: {
    type: String,
    default: ""
  },

  assignedUserName: {
    type: String,
    default: "unassigned"
  },

  dateCreated: {
    type: Date,
    default: Date.now()
  }

}
)


module.exports = mongoose.model('Task', taskSchema);





// var userSchema = new mongoose.Schema({
//     name : String,
//     email : String,
//     pendingTasks :String,
//     dateCreated : {
//       type: Date,
//       default: Date.now()
//     }

// })
// var userVar = mongoose.model('User',userSchema);
// module.exports = userVar;
// module.exports = mongoose.model('Task', taskSchema);

// module.exports = Taskdb;
// module.exports = Userdb;
