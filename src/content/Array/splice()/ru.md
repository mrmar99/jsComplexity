Метод `splice()` изменяет содержимое массива, удаляя существующие элементы и/или добавляя новые. Возвращает массив удаленных элементов.

##### Использование

```js
// Удаляет 0 элементов по индексу 2 и вставляет цифру 3
const nums = [1, 2, 4, 5];
const removed = nums.splice(2, 0, 3);
// nums = [1, 2, 3, 4, 5]
// removed = [], ничего не удалено

// Удаляет 1 элемент по индексу 3
const nums = [1, 2, 3, 4, 5];
const removed = nums.splice(3, 1);
// nums = [1, 2, 3, 5]
// removed = [4]

// Удаляет 1 элемент по индексу 2 и вставляет цифру 3
const nums = [1, 2, 4, 5];
const removed = nums.splice(2, 1, 3);
// nums = [1, 2, 3, 5]
// removed = [4]
```

##### Примерная внутренняя реализация

```js
// n = arr.length + items.length
// k = actualDeleteCount

// this = arr
Array.prototype.splice = function(start, deleteCount, ...items) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Преобразуем полученный индекс start в целое число (или бесконечность)
  let relativeStart = ToIntegerOrInfinity(start);

  // 4. Если relativeStart = -∞, устанавливаем actualStart = 0
  // 5. Иначе, если relativeStart < 0, устанавливаем actualStart = max(len + relativeStart, 0)
  // 6. Иначе, устанавливаем actualStart = min(relativeStart, len)
  let actualStart = (relativeStart === -Infinity) ? 0 : ((relativeStart < 0) ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len));

  // 7. Получаем количество элементов в items
  let itemCount = items.length;

  // 8. Если start отсутствует, устанавливаем actualDeleteCount = 0
  // 9. Иначе, если deleteCount отсутствует, устанавливаем actualDeleteCount = len - actualStart
  // 10. Иначе, устанавливаем actualDeleteCount = clamp(deleteCount, 0, len - actualStart)
  let actualDeleteCount = (start === undefined) ? 0 :
    ((deleteCount === undefined) ? (len - actualStart) : Math.min(Math.max(ToIntegerOrInfinity(deleteCount), 0), len - actualStart));

  // 11. Если len + itemCount - actualDeleteCount > 2**53 - 1, выбрасываем исключение TypeError
  if (len + itemCount - actualDeleteCount > 2 ** 53 - 1) {
    throw new TypeError();
  }

  // 12. Создаем новый массив A с использованием ArraySpeciesCreate
  let A = ArraySpeciesCreate(obj, actualDeleteCount);

  // 13. Устанавливаем k = 0
  let k = 0;

  // 14. Повторяем, пока k < actualDeleteCount
  while (k < actualDeleteCount) {
    // a. Получаем значение ключа from из объекта obj
    let from = ToString(𝔽(actualStart + k));
    // b. Если свойство from существует в объекте obj, то
    if (HasProperty(obj, from)) {
      // i. Получаем значение свойства from из объекта obj
      let fromValue = Get(obj, from);
      // ii. Устанавливаем значение свойства с ключом k в массиве A
      //    равным fromValue
      CreateDataPropertyOrThrow(A, ToString(𝔽(k)), fromValue);
    }
    // c. Увеличиваем k на 1
    k = k + 1;
  }

  // 15. Устанавливаем длину массива A в actualDeleteCount
  Set(A, "length", 𝔽(actualDeleteCount), true);

  // 16. Если itemCount < actualDeleteCount, то
  if (itemCount < actualDeleteCount) {
    // a. Устанавливаем k = actualStart
    k = actualStart;

    // b. Повторяем, пока k < (len - actualDeleteCount)
    while (k < (len - actualDeleteCount)) {
      // i. Получаем значение ключа from из объекта obj
      let from = ToString(𝔽(k + actualDeleteCount));

      // ii. Получаем значение ключа to из объекта obj
      let to = ToString(𝔽(k + itemCount));

      // iii. Если свойство from существует в объекте obj, то
      if (HasProperty(obj, from)) {
        // 1. Получаем значение свойства from из объекта obj
        let fromValue = Get(obj, from);
        // 2. Устанавливаем значение свойства с ключом to в объекте obj
        //    равным fromValue
        Set(obj, to, fromValue, true);
      }
      // iv. В противном случае
      else {
        // 1. Удаляем свойство to из объекта obj
        DeletePropertyOrThrow(obj, to);
      }

      // v. Увеличиваем k на 1
      k = k + 1;
    }

    // c. Устанавливаем k = len
    k = len;

    // d. Повторяем, пока k > (len - actualDeleteCount + itemCount)
    while (k > (len - actualDeleteCount + itemCount)) {
      // i. Удаляем свойство с ключом k - 1 из объекта obj
      DeletePropertyOrThrow(obj, ToString(𝔽(k - 1)));

      // ii. Уменьшаем k на 1
      k = k - 1;
    }
  } else if (itemCount > actualDeleteCount) {
    // 17. Иначе, если itemCount > actualDeleteCount, то
    // a. Устанавливаем k = (len - actualDeleteCount)
    k = len - actualDeleteCount;

    // b. Повторяем, пока k > actualStart
    while (k > actualStart) {
      // i. Получаем значение ключа from из объекта obj
      let from = ToString(𝔽(k + actualDeleteCount - 1));

      // ii. Получаем значение ключа to из объекта obj
      let to = ToString(𝔽(k + itemCount - 1));

      // iii. Если свойство from существует в объекте obj, то
      if (HasProperty(obj, from)) {
        // 1. Получаем значение свойства from из объекта obj
        let fromValue = Get(obj, from);
        // 2. Устанавливаем значение свойства с ключом to в объекте obj
        //    равным fromValue
        Set(obj, to, fromValue, true);
      }
      // iv. В противном случае
      else {
        // 1. Удаляем свойство to из объекта obj
        DeletePropertyOrThrow(obj, to);
      }

      // v. Уменьшаем k на 1
      k = k - 1;
    }
  }

  // 18. Устанавливаем k = actualStart
  k = actualStart;

  // 19. Для каждого элемента E из items, делаем
  for (let E of items) {
    // a. Устанавливаем свойство с ключом k в объекте obj равным E
    Set(obj, ToString(𝔽(k)), E, true);
    // b. Увеличиваем k на 1
    k = k + 1;
  }

  // 20. Устанавливаем длину объекта obj в len - actualDeleteCount + itemCount
  Set(obj, "length", 𝔽(len - actualDeleteCount + itemCount), true);

  // 21. Возвращаем новый массив A
  return A;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let relativeStart be ? ToIntegerOrInfinity(start).
4. If relativeStart = -∞, let actualStart be 0.
5. Else if relativeStart < 0, let actualStart be max(len + relativeStart, 0).
6. Else, let actualStart be min(relativeStart, len).
7. Let itemCount be the number of elements in items.
8. If start is not present, then
  a. Let actualDeleteCount be 0.
9. Else if deleteCount is not present, then
  a. Let actualDeleteCount be len - actualStart.
10. Else,
  a. Let dc be ? ToIntegerOrInfinity(deleteCount).
  b. Let actualDeleteCount be the result of clamping dc between 0 and len - actualStart.
11. If len + itemCount - actualDeleteCount > 2**53 - 1, throw a TypeError exception.
12. Let A be ? ArraySpeciesCreate(O, actualDeleteCount).
13. Let k be 0.
14. Repeat, while k < actualDeleteCount,
  a. Let from be ! ToString(𝔽(actualStart + k)).
  b. If ? HasProperty(O, from) is true, then
    i. Let fromValue be ? Get(O, from).
    ii. Perform ? CreateDataPropertyOrThrow(A, ! ToString(𝔽(k)), fromValue).
  c. Set k to k + 1.
15. Perform ? Set(A, "length", 𝔽(actualDeleteCount), true).
16. If itemCount < actualDeleteCount, then
  a. Set k to actualStart.
  b. Repeat, while k < (len - actualDeleteCount),
    i. Let from be ! ToString(𝔽(k + actualDeleteCount)).
    ii. Let to be ! ToString(𝔽(k + itemCount)).
    iii. If ? HasProperty(O, from) is true, then
      1. Let fromValue be ? Get(O, from).
      2. Perform ? Set(O, to, fromValue, true).
    iv. Else,
      1. Perform ? DeletePropertyOrThrow(O, to).
    v. Set k to k + 1.
  c. Set k to len.
  d. Repeat, while k > (len - actualDeleteCount + itemCount),
    i. Perform ? DeletePropertyOrThrow(O, ! ToString(𝔽(k - 1))).
    ii. Set k to k - 1.
17. Else if itemCount > actualDeleteCount, then
  a. Set k to (len - actualDeleteCount).
  b. Repeat, while k > actualStart,
    i. Let from be ! ToString(𝔽(k + actualDeleteCount - 1)).
    ii. Let to be ! ToString(𝔽(k + itemCount - 1)).
    iii. If ? HasProperty(O, from) is true, then
      1. Let fromValue be ? Get(O, from).
      2. Perform ? Set(O, to, fromValue, true).
    iv. Else,
      1. Perform ? DeletePropertyOrThrow(O, to).
    v. Set k to k - 1.
18. Set k to actualStart.
19. For each element E of items, do
  a. Perform ? Set(O, ! ToString(𝔽(k)), E, true).
  b. Set k to k + 1.
20. Perform ? Set(O, "length", 𝔽(len - actualDeleteCount + itemCount), true).
21. Return A.
```