const { model, Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    content : String,
    createdAt : String,
    sender :{
        type : Schema.Types.ObjectId,
        ref : 'users'
    },
    receiver :{
        type : Schema.Types.ObjectId,
        ref : 'users'
    }
  }
);

module.exports = model("Message", messageSchema);
