Метод `reduce()` применяет функцию reducer к каждому элементу массива (слева-направо), возвращая одно результирующее значение.

##### Использование

```js
const arr = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
arr.reduce(function (accumulator, currentValue, index, array) {
  return accumulator + currentValue;
}, 0);

console.log(sumWithInitial);
// 10
```

##### Примерная внутренняя реализация

```js
// n = arr.length
// k = callbackfn
// m = accumulator

// this = arr
Array.prototype.reduce = function(callbackfn, initialValue) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Проверяем, является ли callbackfn вызываемой функцией
  if (IsCallable(callbackfn) === false) {
    throw new TypeError('callbackfn is not a function');
  }

  // 4. Если массив пуст и initialValue отсутствует, выбрасываем исключение
  if (len === 0 && !initialValue) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  // 5. Устанавливаем начальное значение индекса k в 0
  let k = 0;

  // 6. Инициализируем аккумулятор значением undefined
  let accumulator = undefined;

  // 7. Если присутствует initialValue, устанавливаем аккумулятор в initialValue
  if (initialValue !== undefined) {
    accumulator = initialValue;
  } else {
    // 8. Иначе, ищем первый существующий индекс в obj и устанавливаем аккумулятор
    let kPresent = false;
    while (!kPresent && k < len) {
      let Pk = ToString(𝔽(k));
      kPresent = HasProperty(obj, Pk);
      if (kPresent) {
        accumulator = Get(obj, Pk);
      }
      k++;
    }
    // Если такого индекса не найдено, выбрасываем исключение
    if (!kPresent) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
  }

  // 9. Перебираем элементы массива и применяем callbackfn
  while (k < len) {
    let Pk = ToString(𝔽(k));
    let kPresent = HasProperty(obj, Pk);
    if (kPresent) {
      let kValue = Get(obj, Pk);
      accumulator = Call(callbackfn, undefined, [accumulator, kValue, 𝔽(k), obj]);
    }
    k++;
  }

  // 10. Возвращаем итоговое значение аккумулятора
  return accumulator;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. If IsCallable(callbackfn) is false, throw a TypeError exception.
4. If len = 0 and initialValue is not present, throw a TypeError exception.
5. Let k be 0.
6. Let accumulator be undefined.
7. If initialValue is present, then
  a. Set accumulator to initialValue.
8. Else,
  a. Let kPresent be false.
  b. Repeat, while kPresent is false and k < len,
    i. Let Pk be ! ToString(𝔽(k)).
    ii. Set kPresent to ? HasProperty(O, Pk).
    iii. If kPresent is true, then
      1. Set accumulator to ? Get(O, Pk).
    iv. Set k to k + 1.
  c. If kPresent is false, throw a TypeError exception.
9. Repeat, while k < len,
  a. Let Pk be ! ToString(𝔽(k)).
  b. Let kPresent be ? HasProperty(O, Pk).
  c. If kPresent is true, then
    i. Let kValue be ? Get(O, Pk).
    ii. Set accumulator to ? Call(callbackfn, undefined, « accumulator, kValue, 𝔽(k), O »).
  d. Set k to k + 1.
10. Return accumulator.
```