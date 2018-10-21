exports.bandKeys = {
    consumer_key: 'ee098dd66bc3e8ebc2203c9e7ba02240',
  };
console.log(exports.spotify);
console.log('this is loaded');
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

