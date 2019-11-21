const express = require('express');
const schema = require('./schema/schema');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
mongoose.connect(
  'mongodb://localhost/graphql',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to database');
  }
);

app.use(
  '/graphql',
  express.json(),
  graphqlHTTP({ schema, rootValue: global, graphiql: true })
);

app.listen(4000, () => {
  console.log('server is running on port 4000');
});
