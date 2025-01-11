function picker(obj, keysArray = []) {
  // Use Object.entries to get an array of [key, value] pairs from the object
  // Use Array.prototype.filter to keep only the pairs where the key is in the keysArray
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keysArray.includes(key)
  );

  // Use Object.fromEntries to convert the filtered entries back into an object
  const filteredObject = Object.fromEntries(filteredEntries);

  return filteredObject;
}

module.exports = picker;
