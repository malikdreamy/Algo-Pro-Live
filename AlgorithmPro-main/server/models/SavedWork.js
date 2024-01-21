const { Schema } = require('mongoose')

const workSchema = new Schema({
question: {
    type: String,
   
},
solution: {
    type: String,
  

}

});

module.exports = workSchema;