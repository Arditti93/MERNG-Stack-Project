const { ApolloServer, PubSub } = require('apollo-server') ;
const moongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js');


const pubsub = new PubSub ()

const server = new ApolloServer ({
    connectToDevTools: true,
    typeDefs,
    resolvers,
    context: ({ req }) => ({req, pubsub}) 
});



moongoose
    .connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Mongo Connected')
        return server.listen({ port: 5000});
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })

