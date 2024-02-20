Метод `slice()` возвращает новый массив, содержащий копию части исходного массива.

##### Использование

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// ["camel", "duck"]

console.log(animals.slice(1, 5));
// ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// ["duck", "elephant"]

console.log(animals.slice(2, -1));
// ["camel", "duck"]

console.log(animals.slice());
// ["ant", "bison", "camel", "duck", "elephant"]
```

##### Примерная внутренняя реализация

```js
// n = count

// this = arr
Array.prototype.slice = function(start, end) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Преобразуем начальный индекс в целое число (или бесконечность)
  let relativeStart = ToIntegerOrInfinity(start);

  // 4. Если relativeStart = -∞, устанавливаем k
  let k = (relativeStart === -Infinity) ? 0 : (relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len));

  // 7. Если конечный индекс не определен, устанавливаем relativeEnd в len, иначе преобразуем его в целое число
  let relativeEnd = (end === undefined) ? len : ToIntegerOrInfinity(end);

  // 8. Если relativeEnd = -∞, устанавливаем final в 0
  let final = (relativeEnd === -Infinity) ? 0 : (relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len));

  // 11. Вычисляем количество элементов в подмассиве
  let count = Math.max(final - k, 0);

  // 12. Создаем новый массив A
  let A = ArraySpeciesCreate(obj, count);

  // 13. Инициализируем счетчик n
  let n = 0;

  // 14. Копируем элементы из obj в массив A
  while (k < final) {
    // a. Получаем строковый ключ Pk
    let Pk = ToString(𝔽(k));

    // b. Проверяем, присутствует ли свойство с ключом Pk в obj
    let kPresent = HasProperty(obj, Pk);

    // c. Если свойство присутствует, копируем его в массив A
    if (kPresent) {
      // i. Получаем значение свойства по ключу Pk
      let kValue = Get(obj, Pk);

      // ii. Устанавливаем значение в массив A по ключу n
      CreateDataPropertyOrThrow(A, ToString(𝔽(n)), kValue);
    }

    // d. Увеличиваем счетчики k и n
    k = k + 1;
    n = n + 1;
  }

  // 15. Устанавливаем длину массива A
  Set(A, "length", 𝔽(n), true);

  // 16. Возвращаем массив A
  return A;
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
11. Let count be max(final - k, 0).
12. Let A be ? ArraySpeciesCreate(O, count).
13. Let n be 0.
14. Repeat, while k < final,
  a. Let Pk be ! ToString(𝔽(k)).
  b. Let kPresent be ? HasProperty(O, Pk).
  c. If kPresent is true, then
    i. Let kValue be ? Get(O, Pk).
    ii. Perform ? CreateDataPropertyOrThrow(A, ! ToString(𝔽(n)), kValue).
  d. Set k to k + 1.
  e. Set n to n + 1.
15. Perform ? Set(A, "length", 𝔽(n), true).
16. Return A.
```