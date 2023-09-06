const {ApolloServer} = require('apollo-server-express');
const {loadFilesSync} = require('@graphql-tools/load-files');
const path = require('path');
const {mergeResolvers,mergeTypeDefs} = require('@graphql-tools/merge');
const express = require("express");
const cors = require("cors")
const {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
  } = require("apollo-server-core");
const jwt = require('jsonwebtoken');
const {knex} = require('./db')
const http = require('http')


const typeDefsFile = loadFilesSync(path.join(__dirname,"types"));
const resolverFile = loadFilesSync(path.join(__dirname,"resolvers"));
const typeDefs = mergeTypeDefs(typeDefsFile);
const resolvers = mergeResolvers(resolverFile);


async function startApolloServer(typeDefs,resolvers){
    const app = express();
    const httpServer =http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
          ApolloServerPluginDrainHttpServer({ httpServer }),
          ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
        context: ({ req }) => {
          try {
            const token = (req.headers["authorization"] || "Bearer").replace(
              "Bearer ",
              ""
            );
            // console.log(">>>>>",token);
            const { user } = jwt.verify(token, process.env.secret);
            return { knex, user };
          } catch (e) {
            console.error("JWT verification failed:", e); // log the error
            return { knex };
          }
        },
        
      });
      await server.start();
      app.use(cors());
      server.applyMiddleware({
        app,
        cors: {
          origin: "*",
        },
      });
      await new Promise((resolve) =>
        httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
      );
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    }
    
    startApolloServer(typeDefs, resolvers);

