const pending = new Map();
function singleFlight(key, fn) {

  if (pending.has(key)) {
    return pending.get(key);
  }
  const promise = fn().finally(() => {
    pending.delete(key);
  });
  pending.set(key, promise);
  return promise;
}

module.exports = { singleFlight };
