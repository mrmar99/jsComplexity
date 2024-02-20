Метод `forEach()` выполняет указанную функцию один раз для каждого элемента в массиве.

##### Использование

```js
const arr = ['a', 'b', 'c'];

arr.forEach((element) => console.log(element));

// "a"
// "b"
// "c"
```

##### Примерная внутренняя реализация

```js
// n = arr.length
// k = callbackfn

// this = arr
Array.prototype.forEach = function(callbackfn, thisArg) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Проверяем, является ли callbackfn вызываемой функцией
  if (IsCallable(callbackfn) === false) {
    // Если нет, выбрасываем исключение TypeError
    throw new TypeError();
  }

  // 4. Устанавливаем начальное значение счетчика k = 0
  let k = 0;

  // 5. Повторяем, пока k < len
  while (k < len) {
    // a. Получаем строковое представление k
    let Pk = ToString(𝔽(k));

    // b. Проверяем, есть ли свойство с ключом Pk в объекте obj
    let kPresent = HasProperty(obj, Pk);

    // c. Если свойство существует, выполняем следующие шаги
    if (kPresent === true) {
      // i. Получаем значение свойства по ключу Pk
      let kValue = Get(obj, Pk);

      // ii. Вызываем функцию callbackfn с аргументами kValue, 𝔽(k), obj
      Call(callbackfn, thisArg, [kValue, 𝔽(k), obj]);
    }

    // d. Увеличиваем счетчик k на 1
    k = k + 1;
  }

  // 6. Возвращаем undefined
  return undefined;
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
    ii. Perform ? Call(callbackfn, thisArg, « kValue, 𝔽(k), O »).
  d. Set k to k + 1.
6. Return undefined.
```