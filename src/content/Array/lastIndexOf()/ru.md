Метод `lastIndexOf()` возвращает последний индекс, по которому данный элемент может быть найден в массиве или -1, если такого индекса нет. Массив просматривается от конца к началу, начиная с индекса `fromIndex`.

##### Использование

```js
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.lastIndexOf('Dodo'));
// 3

console.log(animals.lastIndexOf('Tiger'));
// 1
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.lastIndexOf = function(searchElement, fromIndex) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Если длина массива равна 0, возвращаем -1
  if (len === 0) {
    return -1;
  }

  // 4. Если задан fromIndex, преобразуем его в целое число (или бесконечность)
  //    Иначе устанавливаем n = len - 1
  let n = (fromIndex !== undefined) ? ToIntegerOrInfinity(fromIndex) : (len - 1);

  // 5. Если n = -∞, возвращаем -1
  if (n === -Infinity) {
    return -1;
  }

  // 6. Если n ≥ 0, устанавливаем k = min(n, len - 1)
  // 7. Иначе устанавливаем k = len + n
  let k = (n >= 0) ? Math.min(n, len - 1) : (len + n);

  // 8. Пока k ≥ 0
  while (k >= 0) {
    // a. Проверяем, есть ли свойство с ключом k в объекте obj
    let kPresent = HasProperty(obj, ToString(𝔽(k)));

    // b. Если свойство существует
    if (kPresent) {
      // i. Получаем значение элемента с ключом k
      let elementK = Get(obj, ToString(𝔽(k)));

      // ii. Если searchElement строго равен elementK, возвращаем k
      if (IsStrictlyEqual(searchElement, elementK)) {
        return 𝔽(k);
      }
    }

    // c. Уменьшаем k на 1
    k = k - 1;
  }

  // 9. Если не найдено, возвращаем -1
  return -1;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. If len = 0, return -1𝔽.
4. If fromIndex is present, let n be ? ToIntegerOrInfinity(fromIndex); else let n be len - 1.
5. If n = -∞, return -1𝔽.
6. If n ≥ 0, then
  a. Let k be min(n, len - 1).
7. Else,
  a. Let k be len + n.
8. Repeat, while k ≥ 0,
  a. Let kPresent be ? HasProperty(O, ! ToString(𝔽(k))).
  b. If kPresent is true, then
    i. Let elementK be ? Get(O, ! ToString(𝔽(k))).
    ii. If IsStrictlyEqual(searchElement, elementK) is true, return 𝔽(k).
  c. Set k to k - 1.
9. Return -1𝔽.
```