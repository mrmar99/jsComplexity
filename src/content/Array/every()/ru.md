Метод `every()` проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции.

##### Использование

```js
function isBigEnough(element, index, array) {
  return element >= 10;
}

[12, 5, 8, 130, 44].every(isBigEnough); // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

##### Примерная внутренняя реализация

```js
// n = arr.length
// k = callbackfn

// this = arr
Array.prototype.every = function(callbackfn, thisArg) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Проверяем, является ли callbackfn вызываемой функцией
  if (IsCallable(callbackfn) === false) {
    throw new TypeError('callbackfn is not a function');
  }

  // 4. Инициализируем счетчик k значением 0
  let k = 0;

  // 5. Повторяем, пока k < len
  while (k < len) {
    // a. Получаем строковый индекс Pk для текущего значения k
    let Pk = ToString(𝔽(k));

    // b. Проверяем, существует ли свойство с индексом Pk в объекте obj
    let kPresent = HasProperty(obj, Pk);

    // c. Если свойство существует
    if (kPresent === true) {
      // i. Получаем значение элемента по индексу Pk
      let kValue = Get(obj, Pk);

      // ii. Вызываем callbackfn с аргументами kValue, 𝔽(k), obj
      let testResult = ToBoolean(Call(callbackfn, thisArg, [kValue, 𝔽(k), obj]));

      // iii. Если результат вызова callbackfn равен false, возвращаем false
      if (testResult === false) {
        return false;
      }
    }

    // d. Увеличиваем счетчик k на 1
    k = k + 1;
  }

  // 6. Если цикл завершился без возвращения false, возвращаем true
  return true;
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
    iii. If testResult is false, return false.
  d. Set k to k + 1.
6. Return true.
```