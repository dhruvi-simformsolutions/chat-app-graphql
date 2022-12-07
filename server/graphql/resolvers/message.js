const {GraphQLError} = require('graphql')
const Message = require('../../models/Message')
const mongoose = require('mongoose')
const { PubSub } = require("graphql-subscriptions");
const pubSub = new PubSub();
module.exports = {
    Query: {
       async getMessages(_,{sender,receiver}) {
           try{ 
            const message = await Message.find({sender: mongoose.Types.ObjectId(sender),receiver: mongoose.Types.ObjectId(receiver)})
            return message;
        } catch(e){
               throw new Error(e)
           }
       } 
    },
    Mutation: {
        async addMessage(_, {sender,content,receiver},context){
            if(content.trim() === "") throw new Error ("Message Content must not be empty");
            const newMessage = new Message({
                content,
                sender,
                receiver,
                createdAt : new Date().toString()
            });
            const message = await newMessage.save();
            const allMessage = await Message.find({sender: mongoose.Types.ObjectId(sender),receiver: mongoose.Types.ObjectId(receiver)})
            pubSub.publish("NEW_MESSAGE", { newMessages: allMessage });
            return message;
        }
    },
    Subscription: {
        newMessages: {
          subscribe: () => pubSub.asyncIterator(["NEW_MESSAGE"]),
        },
      },
}