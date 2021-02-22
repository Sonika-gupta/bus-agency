function snake_case(str) {
  return str.replace(/([A-Z])/g, (group) => `_${group.toLowerCase()}`);
}

function camelCase(str) {
  return str
    .toLowerCase()
    .replace(/([_][a-z])/g, (group) => group.toUpperCase().replace("_", ""));
}

function getPostgresValues(defaultBus, bus) {
  return Object.keys(defaultBus).map(key => {
    const value = bus[key] || defaultBus[key]
    if(Array.isArray(value)) {
      if(key === 'running_days') return `'{${value}}'::days_type[]`
      else return `'{${value}}'`
    }
    else if(typeof value === 'string') return `'${value}'`
    else return value
  })
}

module.exports = { camelCase, getPostgresValues };
