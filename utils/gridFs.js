const mongoose = require('mongoose');
let gfsBucket;

const conn = mongoose.connection;
conn.once('open', () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
  console.log('GridFSBucket initialized...');
});

module.exports = {
  getGfsBucket: () => gfsBucket,
};
