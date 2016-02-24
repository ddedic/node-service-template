import mongoose from 'mongoose';
import dbConf from './data/db';

const opts = {
  db: {
    safe: true,
  },
};

// Connect to Database
mongoose.connect(dbConf.getURI(), opts, (err) => {
  if (err) {
    console.log(`ERROR connecting to: ${dbConf.getURI()}. ${err}`);
  } else {
    console.log(`Successfully connected to: ${dbConf.getURI()}`);
  }
});

exports.mongoose = mongoose;
