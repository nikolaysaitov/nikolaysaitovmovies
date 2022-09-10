const {
  NODE_ENV,
  JWT_SECRET,
  DATA_BASE = 'mongodb+srv://nikolay:G*GAjtBLS7m63ux@cluster0.n8rwhhk.mongodb.net/?retryWrites=true&w=majority',
} = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

const addressMongoDB = NODE_ENV === 'production' ? DATA_BASE : 'mongodb+srv://nikolay:G*GAjtBLS7m63ux@cluster0.n8rwhhk.mongodb.net/?retryWrites=true&w=majority';

module.exports = {
  addressMongoDB,
  secretKey,
};
