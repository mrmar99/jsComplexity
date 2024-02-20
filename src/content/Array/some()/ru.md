Метод `some()` проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.

##### Использование

```js
const array = [1, 2, 3, 4, 5];

const even = (element) => element % 2 === 0;

console.log(array.some(even));
// true

```

##### Примерная внутренняя реализация

```js
// n = arr.length
// k = callbackfn

// this = arr
Array.prototype.some = function(callbackfn, thisArg) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Проверяем, является ли callbackfn вызываемой функцией
  if (IsCallable(callbackfn) === false) {
    throw new TypeError('callbackfn is not a function');
  }

  // 4. Устанавливаем начальное значение индекса k
  let k = 0;

  // 5. Повторяем, пока k < len
  while (k < len) {
    // a. Получаем строковый ключ Pk для текущего индекса k
    let Pk = ToString(𝔽(k));

    // b. Проверяем, есть ли свойство с ключом Pk в объекте obj
    let kPresent = HasProperty(obj, Pk);

    // c. Если свойство существует, выполняем следующие шаги
    if (kPresent) {
      // i. Получаем значение элемента по ключу Pk
      let kValue = Get(obj, Pk);

      // ii. Вызываем callbackfn с передачей текущего значения, индекса и объекта
      let testResult = ToBoolean(Call(callbackfn, thisArg, [kValue, 𝔽(k), obj]));

      // iii. Если результат callbackfn равен true, возвращаем true
      if (testResult) {
        return true;
      }
    }

    // d. Увеличиваем индекс k на 1
    k = k + 1;
  }

  // 6. Если не найден элемент, для которого callbackfn возвращает true, возвращаем false
  return false;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. If IsCallable(callbackfn) is false, throw a TypeError exception.
4. Let k be 0.
5. Repeat, while k < len,
  a. Let Pk be ! ToString(𝔽(k)).
  b. Let kPresent be ? HasProperty(O, Pk).
  c. If kPresent is true, then
    i. Let kValue be ? Get(O, Pk).
    ii. Let testResult be ToBoolean(? Call(callbackfn, thisArg, « kValue, 𝔽(k), O »)).
    iii. If testResult is true, return true.
  d. Set k to k + 1.
6. Return false.
```