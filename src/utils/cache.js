const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

const setCache = (key, value, ttl) => {
  cache.set(key, value, ttl);
};

const getCache = (key) => {
  return cache.get(key);
};

const deleteCache = (key) => {
  cache.del(key);
};

module.exports = { setCache, getCache, deleteCache };