Метод `copyWithin()` копирует последовательность элементов массива внутри него в позицию, начинающуюся по индексу `target`. Копия берётся по индексам, задаваемым вторым и третьим аргументами `start` и `end` (могут быть отрицательными, тогда отсчет происходит с конца массива). Аргумент `end` является необязательным и по умолчанию равен длине массива.

**Использование**

```js
const arr1 = [1, 2, 3, 4, 5];
arr1.copyWithin(0, 3);
// [4, 5, 3, 4, 5]

const arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

const arr3 = [1, 2, 3, 4, 5];
arr3.copyWithin(0, -2, -1);
// [4, 2, 3, 4, 5]
```

**Внутренняя реализация**

```js
// n = arr.length
// m = items.length
// k = items[i].length (max)

Array.prototype.copyWithin = function(target, start, end = this.length) {
  // 1. Преобразуем this в объект, если это необходимо
  // Здесь это не нужно, так как arr уже является объектом
  // (массив - это объект)
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта
  let len = LengthOfArrayLike(obj);

  // 3. Создаем relativeTarget = target, преобразованный в целое число или бесконечность
  let relativeTarget = ToIntegerOrInfinity(target);

  // 4-6. Вычисляем индекс to (куда будем копировать)
  let to;

  if (relativeTarget === -Infinity) {
    to = 0;
  } else if (relativeTarget < 0) { // если target отрицательный
    to = max(len + relativeTarget, 0);
  } else {
    to = min(relativeTarget, len);
  }

  // 7. Создаем relativeStart = start, преобразованный в целое число или бесконечность
  let relativeStart = ToIntegerOrInfinity(start);

  // 8-10. Вычисляем начальный индекс для копирования
  let from;

  if (relativeStart === -Infinity) {
    from = 0;
  } else if (relativeStart < 0) {
    from = max(len + relativeStart, 0);
  } else {
    from = min(relativeStart, len);
  }

  // 11. Если end равен undefined, то relativeEnd = len,
  // иначе преобразуем end в целое число или бексконечность
  let relativeEnd;
  if (end === undefined) {
    relativeEnd = len;
  } else {
    relativeEnd = ToIntegerOrInfinity(end);
  }

  // 12-14. Вычисляем конечный индекс для копирования
  let final;
  if (relativeEnd === -Infinity) {
    final = 0;
  } else if (relativeEnd < 0) {
    final = max(len + relativeEnd, 0);
  } else {
    final = min(relativeEnd, len);
  }

  // 15. Вычисляем количество элементов для копирования
  let count = min(final - from, len - to);

  // 16-17. Определяем направление копирования
  let direction;
  if (from < to && to < from + count) {
    direction = -1;
    from = from + count - 1;
    to = to + count - 1;
  } else {
    direction = 1;
  }

  // 18. Копируем элементы в новый диапазон
  while (count > 0) {
    let fromkey = ToString(𝔽(from));
    let toKey = ToString(𝔽(to));
    let fromPresent = HasProperty(obj, fromKey);

    if (fromPresent === true) {
      // если элемент есть в obj, копируем его
      let fromVal = Get(obj, fromKey);
      Set(obj, toKey, fromVal, true);
    } else {
      // если элемент отсутствует, удаляем соответствующий
      // элемент в новом диапазоне
      DeletePropertyOrThrow(obj, toKey);
    }

    from += direction;
    to += direction;
    count--;
  }

  // 19. Возвращаем измененный массив
  return obj;
};
```