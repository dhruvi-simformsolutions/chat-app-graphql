const userResolvers = require('./users');
const messageResolvers = require('./message')
module.exports = {
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation
    },
    Query:{
        ...userResolvers.Query,
        ...messageResolvers.Query
    },
    Subscription:{
        ...messageResolvers.Subscription
    }
}