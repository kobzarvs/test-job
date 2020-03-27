// Параметры для имитации задержки fetch API
const MIN_LATENCY = 1000
const MAX_LATENCY = 3000

// Генерация фейковых данных
export const fakeData = Array.from(Array(1000))
  .map((_, i) => ({
    isin: String(i).padStart(12, '0'),
    data: { date: '20200325' },
  }))
  .concat([
    {
      isin: 'XS0971721963',
      data: { date: '20180120' },
    },
    {
      isin: 'RU000A0JU4L3',
      data: { date: '20180120' },
    },
  ])

// fake fetch results
const fetchData = (isins, date) =>
  fakeData.filter(row => {
    return isins.includes(row.isin) && row.data.date === date
  })

const http = {}

// mock fetch
http.post = async ({ url, body }) => {
  let resolve
  const promise = new Promise(rs => (resolve = rs))
  const fetchedData = fetchData(body, url.slice(-8))
  setTimeout(() => resolve(fetchedData), Math.random() * MAX_LATENCY + MIN_LATENCY)
  return promise
}

/**
 * Родительский объект для организации cache
 * Сложность поиска O(1)..O(n)
 * Слжность по памяти: O(n)
 */
export const cache = {
  data: {},
}

/**
 * Для кеширования данных используется составной ключ = data/isin
 */
export const getBondsData = async ({ date, isins }) => {
  const restIsins = []
  // Ищем сначала в cache
  let result = []
  isins.forEach(isin => {
    const key = `${date}/${isin}`
    const cachedRow = cache.data[key]
    if (cachedRow) {
      result.push(cachedRow)
    } else {
      // оставляем отсутствующие в кэш isin
      restIsins.push(isin)
    }
  })

  let fetchedData = []
  if (restIsins.length > 0) {
    // запрашиваем недостающие данные
    fetchedData = await http.post({
      url: `/bonds/${date}`,
      body: restIsins,
    })
    // Добавляем новые данные в cache
    fetchedData.forEach(row => {
      const key = `${date}/${row.isin}`
      cache.data[key] = row
    })
  }

  return result.concat(fetchedData)
}
