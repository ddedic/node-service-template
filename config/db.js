import mongoose from 'mongoose';
import debug from 'debug';

const log = debug('skeleton:server');

export default class {
  constructor(dbConf) {
    this.dbConf = dbConf;
    this.opts = {
      db: {
        safe: true,
      },
    };
    this.connection = mongoose.createConnection();
  }

  // Connect to database
  connect(cb) {
    mongoose.connect(this.dbConf.getURI(), this.opts, (err) => {
      if (err) {
        log(`ERROR connecting to: ${this.dbConf.getURI()}. ${err}`);
        cb(new Error('Error while connecting to database.'));
      } else {
        log(`Successfully connected to: ${this.dbConf.getURI()}`);
        cb();
      }
    });
  }

  // Drop database
  dropDB(cb) {
    mongoose.connection.db.dropDatabase(() => {
      log('Database is dropped.');
      cb();
    });
  }

  // Disconnect from database
  disconnect(cb) {
    mongoose.disconnect(() => {
      log('All connections are disconnected');
      cb();
    });
  }
}
