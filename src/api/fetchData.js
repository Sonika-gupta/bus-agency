export default async function fetchData (route, data, method = 'GET') {
  console.log('requesting', route, data, method)
  const res = await window.fetch('api/' + route, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const value = await res.json()
  console.log('value: ', value)
  if (value.error) throw value.error.message
  return value
}
