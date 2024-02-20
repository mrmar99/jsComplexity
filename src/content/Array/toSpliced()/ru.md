Метод `toSpliced()` создает копию исходного массива и изменяет содержимое **копии**, удаляя существующие элементы и/или добавляя новые. Возвращает новый массив.

##### Использование

```js
const months = ["Jan", "Mar", "Apr", "May"];

// Вставляем элемент по индексу 1
const months2 = months.toSpliced(1, 0, "Feb");
console.log(months2); // ["Jan", "Feb", "Mar", "Apr", "May"]

// Удаляем два элемента, начиная с индекса 2
const months3 = months2.toSpliced(2, 2);
console.log(months3); // ["Jan", "Feb", "May"]

// Заменяем один элемент по индексу 1 двумя новыми
const months4 = months3.toSpliced(1, 1, "Feb", "Mar");
console.log(months4); // ["Jan", "Feb", "Mar", "May"]

// Оригинальный массив не изменен
console.log(months); // ["Jan", "Mar", "Apr", "May"]
```

##### Примерная внутренняя реализация

```js
// n = arr.length + items.length
// k = actualDeleteCount

// this = arr
Array.prototype.toSpliced = function(start, skipCount, ...items) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Преобразуем полученный индекс в целое число (или бесконечность)
  let relativeStart = ToIntegerOrInfinity(start);

  // 4. Если relativeStart = -∞, устанавливаем actualStart = 0
  // 5. Иначе, если relativeStart < 0, устанавливаем actualStart = max(len + relativeStart, 0)
  // 6. Иначе, устанавливаем actualStart = min(relativeStart, len)
  let actualStart = (relativeStart === -Infinity) ? 0 : ((relativeStart < 0) ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len));

  // 7. Получаем количество элементов в items
  let insertCount = items.length;

  // 8. Если start отсутствует, устанавливаем actualSkipCount = 0
  // 9. Иначе, если skipCount отсутствует, устанавливаем actualSkipCount = len - actualStart
  // 10. Иначе, устанавливаем actualSkipCount = min(ToIntegerOrInfinity(skipCount), len - actualStart)
  let actualSkipCount = (!start) ? 0 : ((!skipCount) ? len - actualStart : Math.min(ToIntegerOrInfinity(skipCount), len - actualStart));

  // 11. Вычисляем новую длину массива
  let newLen = len + insertCount - actualSkipCount;

  // 12. Если новая длина превышает 2^53 - 1, выбрасываем исключение TypeError
  if (newLen > 2**53 - 1) {
    throw new TypeError("New length exceeds the maximum array length");
  }

  // 13. Создаем новый массив A длиной newLen
  let A = ArrayCreate(newLen);

  // 14. Инициализируем переменную i
  let i = 0;

  // 15. Инициализируем переменную r
  let r = actualStart + actualSkipCount;

  // 16. Копируем элементы до actualStart
  while (i < actualStart) {
    // a. Получаем ключ Pi
    let Pi = !ToString(𝔽(i));

    // b. Получаем значение iValue по ключу Pi из объекта obj
    let iValue = Get(obj, Pi);

    // c. Устанавливаем свойство A[Pi] со значением iValue
    CreateDataPropertyOrThrow(A, Pi, iValue);

    // d. Увеличиваем i на 1
    i++;
  }

  // 17. Вставляем элементы из items
  for (const E of items) {
    // a. Получаем ключ Pi
    let Pi = !ToString(𝔽(i));

    // b. Устанавливаем свойство A[Pi] со значением E
    CreateDataPropertyOrThrow(A, Pi, E);

    // c. Увеличиваем i на 1
    i++;
  }

  // 18. Копируем оставшиеся элементы после вставки
  while (i < newLen) {
    // a. Получаем ключи Pi и from
    let Pi = !ToString(𝔽(i));
    let from = !ToString(𝔽(r));

    // b. Получаем значение fromValue по ключу from из объекта obj
    let fromValue = Get(obj, from);

    // c. Устанавливаем свойство A[Pi] со значением fromValue
    CreateDataPropertyOrThrow(A, Pi, fromValue);

    // d. Увеличиваем i и r на 1
    i++;
    r++;
  }

  // 19. Возвращаем новый массив A
  return A;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let relativeStart be ? ToIntegerOrInfinity(start).
4. If relativeStart is -∞, let actualStart be 0.
5. Else if relativeStart < 0, let actualStart be max(len + relativeStart, 0).
6. Else, let actualStart be min(relativeStart, len).
7. Let insertCount be the number of elements in items.
8. If start is not present, then
  a. Let actualSkipCount be 0.
9. Else if skipCount is not present, then
  a. Let actualSkipCount be len - actualStart.
10. Else,
  a. Let sc be ? ToIntegerOrInfinity(skipCount).
  b. Let actualSkipCount be the result of clamping sc between 0 and len - actualStart.
11. Let newLen be len + insertCount - actualSkipCount.
12. If newLen > 2**53 - 1, throw a TypeError exception.
13. Let A be ? ArrayCreate(newLen).
14. Let i be 0.
15. Let r be actualStart + actualSkipCount.
16. Repeat, while i < actualStart,
  a. Let Pi be ! ToString(𝔽(i)).
  b. Let iValue be ? Get(O, Pi).
  c. Perform ! CreateDataPropertyOrThrow(A, Pi, iValue).
  d. Set i to i + 1.
17. For each element E of items, do
  a. Let Pi be ! ToString(𝔽(i)).
  b. Perform ! CreateDataPropertyOrThrow(A, Pi, E).
  c. Set i to i + 1.
18. Repeat, while i < newLen,
  a. Let Pi be ! ToString(𝔽(i)).
  b. Let from be ! ToString(𝔽(r)).
  c. Let fromValue be ? Get(O, from).
  d. Perform ! CreateDataPropertyOrThrow(A, Pi, fromValue).
  e. Set i to i + 1.
  f. Set r to r + 1.
19. Return A.
```