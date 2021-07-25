function getPostgresValues (defaultBus, bus) {
  return Object.keys(defaultBus).map(key => {
    const value = bus[key] || defaultBus[key]
    if (Array.isArray(value)) {
      if (key === 'running_days') return `'{${value}}'::days_type[]`
      else return `'{${value}}'`
    } else if (typeof value === 'string') return `'${value}'`
    else return value
  })
}

module.exports = { getPostgresValues }
