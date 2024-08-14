import express from 'express';

import AppRoute from './routes/web.js';

import conn from './mongoose/conn.js';

import User from './mongoose/models/UserModel.js';

import Auction from './mongoose/models/AuctionModel.js';

import bodyParser from 'body-parser';

import schema from './graphql/UserSchema.js';

import resolvers from './graphql/resolvers.js';

import { graphqlHTTP } from 'express-graphql';


import cors from 'cors';


const app = express();

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());




app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers, // Connect resolvers with schema
    graphiql: true
  }));
  

app.use('/api',AppRoute);

app.listen(PORT,()=>{

    console.log("Server is Running!");

});

