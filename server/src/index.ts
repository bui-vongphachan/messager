import dotenv from "dotenv";
import { createServer as createHTTPServer } from "http";
import { createServer as createHTTPSServer } from "https";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { type_defs as typeDefs } from "./type-defs";
import mongoose from "mongoose";
import { AuthenticationError } from "apollo-server";
import { pubsub, verifyToken } from "./helpers";
import { app } from "./app";
import fs from "fs";
import { FACEBOOK_PROFILE_QUEUE, FirebaseUser } from "./models";
import moment from "moment";

dotenv.config();

(async function () {
  const httpServer = (() => {
    if (process.env.NODE_ENV === "production") {
      return createHTTPServer(app);
    } else {
      return createHTTPSServer(
        {
          key: fs.readFileSync("key.pem"),
          cert: fs.readFileSync("cert.pem"),
        },
        app
      );
    }
  })();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: async (connectionParams, webSocket, context) => {
        const token = connectionParams.Authorization;

        const { profile, isAuthenticated } = await verifyToken(token);

        if (!isAuthenticated) {
          throw new AuthenticationError("You must be logged in");
        }

        return { profile, isAuthenticated };
      },
      onOperation: async (message, params) => {
        if (!params.context.isAuthenticated) {
          throw new AuthenticationError("You must be logged in");
        }

        return { ...params, ...message };
      },
      onDisconnect: async (webSocket, context) => {},
    },
    { server: httpServer, path: "/subscriptions" }
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const token = req.headers.authorization || "";

      const { profile, isAuthenticated } = await verifyToken(token);

      return { profile, isAuthenticated };
    },
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT;
  httpServer.listen(PORT, async () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
    console.log(
      `Subscriptions are now running on wss://localhost:${PORT}/subscriptions`
    );

    await mongoose.connect(process.env.DATABASE_URI, {
      autoIndex: true,
      autoCreate: true,
    });

    console.log("Connected to database");
  });
})();
