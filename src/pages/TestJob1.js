import React, { useState, useEffect } from "react";
import { Layout } from "../layouts";

const FormField = ({ children }) => (
  <div className="form-field">{children}</div>
);

const ERROR_ACCEPTED_FORMAT = `Допустимый формат: ['123.456', "123.456"]`;
const ERROR_EMPTY_FIELD = "Пустое поле!";
const ERROR_EMPTY_ARRAY = "Пустой массив!";
const ERROR_INCORRECT_VALUES =
  "Элементы должны быть рациональными числами в кавычках!";

const initialState = JSON.stringify(["1.5", "3", "6", "1.5"], null, 2);

const validateField = value => {
  if (!value || !value.trim()) return ERROR_EMPTY_FIELD;
};

export const TestJob1 = props => {
  const [source, setSource] = useState(initialState);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const calc = value => {
    try {
      const list = JSON.parse(value.replace(/'/g, '"'));
      if (!Array.isArray(list)) return setError(ERROR_ACCEPTED_FORMAT);
      if (list.length === 0) return setError(ERROR_EMPTY_ARRAY);
      if (list.some(item => typeof item !== "string" || !item.trim())) {
        return setError(ERROR_INCORRECT_VALUES);
      }

      // 1. Считаем общую сумму элементов
      const sum = list.reduce((acc, item) => acc + parseFloat(item), 0);
      // 2. Вычисление доли в процентном выражении с точностью до трех знаков
      const pieceList = list.map(item =>
        ((parseFloat(item) * 100) / sum).toFixed(3)
      );

      // Вывод результата
      setResult(JSON.stringify(pieceList, null, 2).replace(/"/g, "'"));
    } catch (e) {
      return setError(ERROR_ACCEPTED_FORMAT);
    }
    setError("");
  };

  const validateInputChar = e => {
    if (e.key.length === 1 && e.key.match(/[^\d"'[\].,\s]/)) {
      e.preventDefault();
      setError(ERROR_ACCEPTED_FORMAT);
    }
  };

  const handleChange = e => {
    const { value } = e.target;
    const error = validateField(value);
    if (error) {
      e.preventDefault();
      e.stopPropagation();
      setError(error);
      return;
    }
    setSource(value);
    calc(value);
  };

  useEffect(() => calc(source), []);

  return (
    <Layout {...props}>
      <div className="row">
        <FormField>
          <label htmlFor="source">Массив долей</label>
          <textarea
            className="text-field"
            id="source"
            rows="12"
            value={source}
            onChange={handleChange}
            onKeyDown={validateInputChar}
          />
        </FormField>
        <FormField>
          <label htmlFor="result">Доли в процентах</label>
          <textarea
            className="text-field"
            id="result"
            rows="12"
            value={result}
            disabled
          />
        </FormField>
      </div>
      <div className="row field-error">{error}</div>
    </Layout>
  );
};
