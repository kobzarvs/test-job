export const run = ({ list }) => {
  // 1. Считаем общую сумму элементов
  const sum = list.reduce((acc, item) => acc + parseFloat(item), 0)
  // 2. Вычисление доли в процентном выражении с точностью до трех знаков
  return list.map(item => ((parseFloat(item) * 100) / sum).toFixed(3))
}
