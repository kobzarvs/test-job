const MIN_LATENCY = 200
const MAX_LATENCY = 2000

const buildResult = () => {
  return [
    {
      isin: 'XS0971721963',
      data: {},
    },
    {
      isin: 'RU000A0JU4L3',
      data: {},
    },
  ]
}

const http = { cache: {} }

http.post = async ({ url, body }) => {
  let resolve
  const promise = new Promise(rs => (resolve = rs))
  setTimeout(() => resolve(buildResult()), Math.random() * MAX_LATENCY + MIN_LATENCY)
  return promise
}

export const getBondsData = async ({ date, isins }) => {
  const result = await http.post({
    url: `/bonds/${date}`,
    body: isins,
  })
  return result
}
