Метод `unshift()` добавляет один или более элементов в начало массива и возвращает **новую длину** массива.

Когда мы используем `unshift()` для добавления нескольких элементов в начало массива, это может занять дополнительную память. Если текущая длина массива не достаточна для хранения всех новых элементов, то может потребоваться выделение дополнительной памяти.

В большинстве современных движков JavaScript такие операции управления памятью автоматизированы, и они заботятся о расширении массива и выделении необходимой памяти. Как следствие, сложность по памяти для метода `unshift()` остается амортизированной `O(1)` в среднем случае, но иногда может возникнуть необходимость в выделении дополнительной памяти, что приведет к временным затратам.

##### Использование

```js
const arr = [1, 2];

arr.unshift(0); // = 3
// [0, 1, 2]

arr.unshift(-2, -1); // = 5
// [-2, -1, 0, 1, 2]

arr.unshift([-3]); // = 6
// [[-3], -2, -1, 0, 1, 2]
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.unshift = function(...items) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Получаем количество элементов в массиве items
  let argCount = items.length;

  // 4. Если argCount > 0, выполняем следующие шаги
  if (argCount > 0) {
    // a. Если len + argCount > 2**53 - 1, выбрасываем исключение TypeError
    if (len + argCount > 2**53 - 1) {
      throw new TypeError();
    }

    // b. Устанавливаем начальное значение для индекса k
    let k = len;

    // c. Повторяем, пока k > 0
    while (k > 0) {
      // i. Получаем строковые представления индексов from и to
      let from = ToString(𝔽(k - 1));
      let to = ToString(𝔽(k + argCount - 1));

      // ii. Проверяем, есть ли свойство с индексом from
      let fromPresent = HasProperty(obj, from);

      // iii. Если свойство с индексом from существует
      if (fromPresent) {
        // 1. Получаем значение свойства from
        let fromValue = Get(obj, from);
        // 2. Устанавливаем значение свойства to равным fromValue
        Set(obj, to, fromValue, true);
      } else {
        // 1. Если свойства с индексом from нет, удаляем свойство to
        DeletePropertyOrThrow(obj, to);
      }

      // iv. Уменьшаем значение k
      k = k - 1;
    }

    // d. Устанавливаем начальное значение для индекса j
    let j = +0𝔽;

    // e. Для каждого элемента E массива items выполняем следующие шаги
    for (let E of items) {
      // i. Устанавливаем свойство с индексом j равным E
      Set(obj, ToString(j), E, true);
      // ii. Увеличиваем значение j
      j = j + 1𝔽;
    }
  }

  // 5. Устанавливаем новую длину массива (len + argCount)
  Set(obj, "length", 𝔽(len + argCount), true);

  // 6. Возвращаем новую длину массива
  return 𝔽(len + argCount);
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let argCount be the number of elements in items.
4. If argCount > 0, then
  a. If len + argCount > 2**53 - 1, throw a TypeError exception.
  b. Let k be len.
  c. Repeat, while k > 0,
    i. Let from be ! ToString(𝔽(k - 1)).
    ii. Let to be ! ToString(𝔽(k + argCount - 1)).
    iii. Let fromPresent be ? HasProperty(O, from).
    iv. If fromPresent is true, then
      1. Let fromValue be ? Get(O, from).
      2. Perform ? Set(O, to, fromValue, true).
    v. Else,
      1. Assert: fromPresent is false.
      2. Perform ? DeletePropertyOrThrow(O, to).
    vi. Set k to k - 1.
  d. Let j be +0𝔽.
  e. For each element E of items, do
    i. Perform ? Set(O, ! ToString(j), E, true).
    ii. Set j to j + 1𝔽.
5. Perform ? Set(O, "length", 𝔽(len + argCount), true).
6. Return 𝔽(len + argCount).
```