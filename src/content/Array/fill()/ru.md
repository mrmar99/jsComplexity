Метод `fill()` заполняет все элементы массива от начального до конечного индексов одним значением.

##### Использование

```js
const array1 = [1, 2, 3, 4];

console.log(array1.fill(0, 2, 4));
// [1, 2, 0, 0]

console.log(array1.fill(5, 1));
// [1, 5, 5, 5]

console.log(array1.fill(6));
// [6, 6, 6, 6]
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.fill = function(value, start, end) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Преобразуем полученный индекс начала заполнения в целое число (или бесконечность)
  let relativeStart = ToIntegerOrInfinity(start);

  // 4. Если relativeStart = -∞, устанавливаем k = 0
  // 5. Иначе, если relativeStart < 0, устанавливаем k = max(len + relativeStart, 0)
  // 6. Иначе, устанавливаем k = min(relativeStart, len)
  let k = (relativeStart === -Infinity) ? 0 : ((relativeStart < 0) ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len));

  // 7. Если конечный индекс не определен, устанавливаем relativeEnd = len
  // Иначе, устанавливаем relativeEnd = ToIntegerOrInfinity(end)
  let relativeEnd = (end === undefined) ? len : ToIntegerOrInfinity(end);

  // 8. Если relativeEnd = -∞, устанавливаем final = 0
  // 9. Иначе, если relativeEnd < 0, устанавливаем final = max(len + relativeEnd, 0)
  // 10. Иначе, устанавливаем final = min(relativeEnd, len)
  let final = (relativeEnd === -Infinity) ? 0 : ((relativeEnd < 0) ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len));

  // 11. Пока k < final,
  //   a. Получаем строковое представление текущего индекса Pk
  //   b. Устанавливаем значение value по ключу Pk в объекте obj
  //   c. Увеличиваем k на 1
  while (k < final) {
    let Pk = ToString(𝔽(k));
    Set(obj, Pk, value, true);
    k++;
  }

  // 12. Возвращаем объект obj
  return obj;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let relativeStart be ? ToIntegerOrInfinity(start).
4. If relativeStart = -∞, let k be 0.
5. Else if relativeStart < 0, let k be max(len + relativeStart, 0).
6. Else, let k be min(relativeStart, len).
7. If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToIntegerOrInfinity(end).
8. If relativeEnd = -∞, let final be 0.
9. Else if relativeEnd < 0, let final be max(len + relativeEnd, 0).
10. Else, let final be min(relativeEnd, len).
11. Repeat, while k < final,
  a. Let Pk be ! ToString(𝔽(k)).
  b. Perform ? Set(O, Pk, value, true).
  c. Set k to k + 1.
12. Return O.
```