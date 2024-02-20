Метод `map()` создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.

##### Использование

```js
const numbers = [1, 4, 9];
const roots = numbers.map(Math.sqrt);
// roots = [1, 2, 3]
// numbers = [1, 4, 9]
```

##### Примерная внутренняя реализация

```js
// n = arr.length
// k = callbackfn

// this = arr
Array.prototype.map = function(callbackfn, thisArg) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта O
  let len = LengthOfArrayLike(obj);

  // 3. Проверяем, является ли callbackfn вызываемой функцией
  if (IsCallable(callbackfn) === false) {
    throw new TypeError("callbackfn is not a function");
  }

  // 4. Создаем новый массив A с использованием ArraySpeciesCreate
  let A = ArraySpeciesCreate(obj, len);

  // 5. Устанавливаем начальное значение k в 0
  let k = 0;

  // 6. Повторяем, пока k < len
  while (k < len) {
    // a. Получаем строковое представление k
    let Pk = ToString(𝔽(k));

    // b. Проверяем, существует ли свойство с ключом Pk в объекте obj
    let kPresent = HasProperty(obj, Pk);

    // c. Если свойство существует, то
    if (kPresent === true) {
      // i. Получаем значение свойства Pk
      let kValue = Get(obj, Pk);

      // ii. Вызываем callbackfn с параметрами kValue, 𝔽(k), obj
      let mappedValue = Call(callbackfn, thisArg, [kValue, 𝔽(k), obj]);

      // iii. Создаем или изменяем свойство Pk в массиве A с значением mappedValue
      CreateDataPropertyOrThrow(A, Pk, mappedValue);
    }

    // d. Увеличиваем k на 1
    k = k + 1;
  }

  // 7. Возвращаем новый массив A
  return A;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. If IsCallable(callbackfn) is false, throw a TypeError exception.
4. Let A be ? ArraySpeciesCreate(O, len).
5. Let k be 0.
6. Repeat, while k < len,
  a. Let Pk be ! ToString(𝔽(k)).
  b. Let kPresent be ? HasProperty(O, Pk).
  c. If kPresent is true, then
    i. Let kValue be ? Get(O, Pk).
    ii. Let mappedValue be ? Call(callbackfn, thisArg, « kValue, 𝔽(k), O »).
    iii. Perform ? CreateDataPropertyOrThrow(A, Pk, mappedValue).
  d. Set k to k + 1.
7. Return A.
```