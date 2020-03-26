import React, { useRef, useState, useEffect } from 'react'
import { Layout } from '../layouts'
import { FormField } from '../components/FormField'
import { fakeData, cache, getBondsData } from '../models/testJob2'

export const TestJob2 = props => {
  const dateRef = useRef()
  const isinsRef = useRef()
  const [result, setResult] = useState([])
  const [errors, setErrors] = useState({})

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
    }
    const result = await getBondsData({ date, isins })
    setResult(result)
  }

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
            <button style={{ flex: '0 0', marginLeft: 20 }} onClick={query}>
              Запрос
            </button>
          </div>
        </FormField>
      </div>
      <div className="row" style={{ marginTop: 20 }}>
        <FormField style={{ flex: '1 0' }}>
          <label htmlFor="result">Результат запроса</label>
          <textarea
            className="text-field result"
            id="result"
            rows="12"
            value={JSON.stringify(result, null, 2)}
            disabled
          />
        </FormField>
        <FormField style={{ flex: '1 0' }}>
          <label htmlFor="cache">Cache</label>
          <textarea
            className="text-field result"
            id="cache"
            rows="12"
            value={JSON.stringify(cache, null, 2)}
            disabled
          />
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
