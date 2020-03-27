/**
 * Вычислительная сложность: O(2n)
 * Сложность по памяти: O(2n)
 * Время выполнения на моем ПК 10 млн элементов массива, обработались
 * данной функицей примерно за 3 сек.
 */

export const piecesToPercents = ({ list }) => {
  if (!Array.isArray(list)) return null
  // 1. Считаем общую сумму элементов
  const sum = list.reduce((acc, item) => acc + parseFloat(item), 0)
  // 2. Вычисление доли в процентном выражении с точностью до трех знаков
  return list.map(item => ((parseFloat(item) * 100) / sum).toFixed(3))
}
