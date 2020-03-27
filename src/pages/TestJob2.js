import React, { useState, useEffect } from 'react'
import { Layout } from '../layouts'
import { FormField } from '../components/FormField'
import { fakeData, cache, getBondsData } from '../models/testJob2'
import { Form, Button, Input, DatePicker } from 'antd'
import { ClearOutlined } from '@ant-design/icons'
import locale from 'antd/lib/locale/ru_RU'

export const TestJob2 = props => {
  const [form] = Form.useForm()
  const [result, setResult] = useState()
  const [loading, setLoading] = useState(false)
  const [, forceUpdate] = useState()
  const [resultUpdated, setResultUpdated] = useState(false)
  const [cacheUpdated, setCacheUpdated] = useState(false)
  const cacheLength = cache.data ? Object.keys(cache.data).length : 0

  const flashField = (cmd, timeout = 1000) => {
    cmd(true)
    setTimeout(() => cmd(false), timeout)
  }

  const clearCache = () => {
    cache.data = {}
    forceUpdate()
    flashField(setCacheUpdated)
  }

  const query = async ({ date, isins }) => {
    if (!date || !isins) return

    setLoading(true)
    const result = await getBondsData({
      date: date.format('YYYYMMDD'),
      isins: isins
        .replace(/,/g, ' ')
        .replace(/\s+/g, ',')
        .split(','),
    })
    setLoading(false)
    setResult(result)
  }

  useEffect(() => {
    result && flashField(setResultUpdated)
  }, [result])

  useEffect(() => {
    flashField(setCacheUpdated)
  }, [cacheLength])

  return (
    <Layout {...props}>
      <h4>Введите дату и список ISIN</h4>
      <div className="row form-fieldset">
        <Form
          form={form}
          layout="inline"
          onFinish={query}
          style={{
            display: 'flex',
            width: '100%',
            padding: 0,
            margin: 0,
            justifyContent: 'space-between !important',
          }}
        >
          <Form.Item
            name="date"
            rules={[{ required: true, message: 'Обязательное поле!' }]}
            style={{ flex: '0 0 150px', margin: 0 }}
          >
            <DatePicker locale={locale.DatePicker} autoFocus id="date" type="date" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="isins"
            rules={[{ required: true, message: 'Обязательное поле' }]}
            style={{ flex: '1 0 100px', margin: 0, marginLeft: 5 }}
          >
            <Input
              // className="input-field"
              // style={{ width: '100%' }}
              placeholder="XS0971721963 000000000012 000000000015"
              id="isins"
              type="text"
              // onChange={change}
              // style={{ flex: '1 0', border: `1px solid ${errors.isins ? 'red' : '#ccc'}`, padding: 2 }}
            />
          </Form.Item>
          <Form.Item shouldUpdate={true} style={{ flex: '0 1', margin: 0, marginLeft: 5 }}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                // style={{ marginLeft: 8 }}
                onClick={query}
                loading={loading}
                disabled={form.getFieldsError().filter(({ errors }) => errors.length).length}
              >
                Запрос
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>

      <div className="row" style={{ marginTop: 20 }}>
        <FormField style={{ flex: '1 0' }}>
          <label htmlFor="result">Результат запроса</label>
          <div style={{ width: '100%', position: 'relative' }}>
            <textarea
              style={{
                transition: 'box-shadow 1s',
                boxShadow: resultUpdated ? '0 0 10px green' : 'none',
                width: '100%',
              }}
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
            style={{
              transition: 'box-shadow 1s',
              boxShadow: cacheLength && cacheUpdated ? '0 0 10px green' : 'none',
              width: '100%',
            }}
            id="cache"
            rows="12"
            value={JSON.stringify(cache.data, null, 2)}
            disabled
          />
          <Button
            style={{ alignSelf: 'flex-end', marginTop: 5 }}
            onClick={clearCache}
            type="danger"
            disabled={loading || cacheLength === 0}
            block
            icon={<ClearOutlined />}
          >
            Очистить cache
          </Button>
        </FormField>
        <FormField style={{ flex: '1 0' }}>
          <label htmlFor="fake">Данные в СУБД</label>
          <textarea style={{ width: '100%' }} id="fake" rows="12" value={JSON.stringify(fakeData, null, 2)} disabled />
        </FormField>
      </div>
    </Layout>
  )
}
