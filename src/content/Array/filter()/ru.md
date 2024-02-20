Метод `filter()` создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции.

##### Использование

```js
const arr = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = arr.filter((word) => word.length > 6);

console.log(result);
// ["exuberant", "destruction", "present"]
```

##### Примерная внутренняя реализация

```js
// n = arr.length
// k = callbackfn

// this = arr
Array.prototype.filter = function(callbackfn, thisArg) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Проверяем, является ли callbackfn функцией
  if (IsCallable(callbackfn) === false) {
    throw new TypeError('Callback is not a function');
  }

  // 4. Создаем новый массив A с использованием ArraySpeciesCreate
  let A = ArraySpeciesCreate(obj, 0);

  // 5-6. Устанавливаем начальные значения k и to
  let k = 0;
  let to = 0;

  // 7. Повторяем, пока k < len
  while (k < len) {
    // a. Получаем ключ Pk
    let Pk = ToString(𝔽(k));

    // b. Проверяем, присутствует ли свойство с ключом Pk в объекте obj
    let kPresent = HasProperty(obj, Pk);

    // c. Если свойство присутствует, выполняем следующие шаги
    if (kPresent) {
      // i. Получаем значение свойства kValue
      let kValue = Get(obj, Pk);

      // ii. Вызываем callbackfn с аргументами kValue, 𝔽(k), и obj
      let selected = ToBoolean(Call(callbackfn, thisArg, [kValue, 𝔽(k), obj]));

      // iii. Если результат вызова callbackfn равен true, выполняем следующие шаги
      if (selected) {
        // 1. Добавляем свойство в массив A с ключом to и значением kValue
        CreateDataPropertyOrThrow(A, ToString(𝔽(to)), kValue);

        // 2. Увеличиваем to на 1
        to = to + 1;
      }
    }

    // d. Увеличиваем k на 1
    k = k + 1;
  }

  // 8. Возвращаем массив A
  return A;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. If IsCallable(callbackfn) is false, throw a TypeError exception.
4. Let A be ? ArraySpeciesCreate(O, 0).
5. Let k be 0.
6. Let to be 0.
7. Repeat, while k < len,
  a. Let Pk be ! ToString(𝔽(k)).
  b. Let kPresent be ? HasProperty(O, Pk).
  c. If kPresent is true, then
    i. Let kValue be ? Get(O, Pk).
    ii. Let selected be ToBoolean(? Call(callbackfn, thisArg, « kValue, 𝔽(k), O »)).
    iii. If selected is true, then
      1. Perform ? CreateDataPropertyOrThrow(A, ! ToString(𝔽(to)), kValue).
      2. Set to to to + 1.
  d. Set k to k + 1.
8. Return A.
```