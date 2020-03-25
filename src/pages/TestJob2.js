import React, { useRef, useState, useEffect } from 'react'
import { Layout } from '../layouts'
import { FormField } from '../components/FormField'
import { fakeData, cache, getBondsData } from '../models/testJob2'

export const TestJob2 = props => {
  const ref = useRef()
  const [result, setResult] = useState([])

  return (
    <Layout {...props}>
      <div className="row">
        <FormField style={{ width: '100%' }}>
          <label htmlFor="isins">Список ISIN</label>
          <div className="row">
            <input autoFocus id="isins" type="text" ref={ref} style={{ flex: '1 0' }} />
            <button style={{ flex: '0 0' }}>Запрос</button>
          </div>
        </FormField>
      </div>
      <div className="row" style={{ marginTop: 10, justifyContent: 'stretch' }}>
        <FormField style={{ flex: '1 0' }}>
          <label htmlFor="result">Результат запроса</label>
          <textarea className="text-field" style={{ width: '100%' }} id="result" rows="12" value={result} disabled />
        </FormField>
        <FormField style={{ flex: '1 0' }}>
          <label htmlFor="cache">Cache</label>
          <textarea
            className="text-field"
            style={{ width: '100%' }}
            id="cache"
            rows="12"
            value={JSON.stringify(cache)}
            disabled
          />
        </FormField>
        <FormField style={{ flex: '1 0' }}>
          <label htmlFor="fake">Данные в СУБД</label>
          <textarea
            className="text-field"
            style={{ width: '100%' }}
            id="fake"
            rows="12"
            value={JSON.stringify(fakeData)}
            disabled
          />
        </FormField>
      </div>
    </Layout>
  )
}
