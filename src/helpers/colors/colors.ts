/**
 * Возвращает случайный цвет в шестнадцатеричном коде.
 */
function randomColor() {
  const number = Math.floor((Math.random() * 0xffffff) << 0);
  const hex = number.toString(16);
  return `#${hex}`;
}

/**
 * Извлечение значения яркости цвета, где значение больше - значит ярче.
 * @param color Цвет в шестнадцатеричном коде (0xFFFFFF).
 */
function getBrightness(color: string) {
  const r = parseInt(color.slice(1, 3), 16) * 299;
  const g = parseInt(color.slice(3, 5), 16) * 587;
  const b = parseInt(color.slice(5, 7), 16) * 114;

  return Math.round((r + g + b) / 1000);
}

// Объект со вспомогательными функциями для работы с цветами.
const colors = {
  randomColor,
  getBrightness,
};

export default colors;
