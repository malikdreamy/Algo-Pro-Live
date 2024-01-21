const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const ai = require('./utils/airesponse');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: authMiddleware,
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(ai);

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Catch-all route for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });


// Start Apollo Server
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();
