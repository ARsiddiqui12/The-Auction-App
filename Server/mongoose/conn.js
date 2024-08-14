import mongoose from "mongoose";

const uri = "mongodb+srv://<username>:<password>@cluster0.yyqkcnv.mongodb.net/auctionpro?retryWrites=true&w=majority&appName=Cluster0";

const dbName = 'auctionpro';

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Establish MongoDB connection
mongoose.connect(uri, clientOptions)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  export default mongoose.connection;