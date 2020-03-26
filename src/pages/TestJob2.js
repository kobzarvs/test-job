import React, { useRef, useState, useEffect } from 'react'
import { Layout } from '../layouts'
import { FormField } from '../components/FormField'
import { fakeData, cache, getBondsData } from '../models/testJob2'

export const TestJob2 = props => {
  const dateRef = useRef()
  const isinsRef = useRef()
  const [result, setResult] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [updater, forceUpdate] = useState(false)
  const [resultUpdated, setResultUpdated] = useState(false)
  const [cacheUpdated, setCacheUpdated] = useState(false)
  const cacheLength = cache.data ? Object.keys(cache.data).length : 0

  const flashField = (cmd, timeout = 1000) => {
    cmd(true)
    setTimeout(() => cmd(false), timeout)
  }

  const clearCache = () => {
    cache.data = {}
    forceUpdate(state => !state)
    flashField(setCacheUpdated)
  }

  const query = async () => {
    const errors = {}
    let isins = isinsRef.current.value
    if (!isins.trim()) errors.isins = true
    isins = isins.replace(/,/g, ' ').replace(/\s+/g, ',')
    isins = isins.split(',')
    if (isins.length === 0) errors.isins = true

    let date = dateRef.current.value
    if (!date.trim()) errors.date = true
    date = date.replace(/-/g, '')
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      setTimeout(() => setErrors({}), 3000)
    } else {
      setLoading(true)
      const result = await getBondsData({ date, isins })
      setLoading(false)
      setResult(result)
    }
  }

  useEffect(() => {
    flashField(setResultUpdated)
  }, [result])

  useEffect(() => {
    flashField(setCacheUpdated)
  }, [cacheLength])

  return (
    <Layout {...props}>
      <div className="row form-fieldset">
        <FormField style={{ flex: '0 1 100px' }}>
          <label htmlFor="date">Дата</label>
          <input
            className="input-field"
            autoFocus
            id="date"
            type="date"
            ref={dateRef}
            style={{ width: 150, border: `1px solid ${errors.date ? 'red' : '#ccc'}`, padding: 2 }}
          />
        </FormField>
        <FormField style={{ flex: '1 0 50%' }}>
          <label htmlFor="isins">Список ISIN</label>
          <div className="row">
            <input
              className="input-field"
              id="isins"
              type="text"
              ref={isinsRef}
              style={{ flex: '1 0', border: `1px solid ${errors.isins ? 'red' : '#ccc'}`, padding: 2 }}
            />
            <button style={{ flex: '0 0', marginLeft: 20 }} onClick={query} disabled={loading}>
              Запрос
            </button>
          </div>
        </FormField>
      </div>
      <div className="row" style={{ marginTop: 20 }}>
        <FormField style={{ flex: '1 0' }}>
          <label htmlFor="result">Результат запроса</label>
          <div style={{ width: '100%', position: 'relative' }}>
            <textarea
              className="text-field result"
              style={{ boxShadow: resultUpdated ? '0 0 10px green' : 'none' }}
              id="result"
              rows="12"
              value={JSON.stringify(result, null, 2)}
              disabled
            />
            {loading && <div className="spin" />}
          </div>
        </FormField>
        <FormField style={{ flex: '1 0' }}>
          <label htmlFor="cache">Cache ({cacheLength})</label>
          <textarea
            className="text-field result"
            style={{ boxShadow: cacheLength && cacheUpdated ? '0 0 10px green' : 'none' }}
            id="cache"
            rows="12"
            value={JSON.stringify(cache.data, null, 2)}
            disabled
          />
          <button style={{ alignSelf: 'flex-end' }} onClick={clearCache}>
            Очистить cache
          </button>
        </FormField>
        <FormField style={{ flex: '1 0' }}>
          <label htmlFor="fake">Данные в СУБД</label>
          <textarea
            className="text-field result"
            id="fake"
            rows="12"
            value={JSON.stringify(fakeData, null, 2)}
            disabled
          />
        </FormField>
      </div>
    </Layout>
  )
}
