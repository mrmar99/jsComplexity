Метод `shift()` удаляет первый элемент из массива и возвращает его значение. Этот метод изменяет длину массива.

##### Использование

```js
const nums = [1, 2, 3, 4];

console.log(nums);
// [1, 2, 3, 4]

const shifted = nums.shift();

console.log(nums);
// [2, 3, 4]

console.log(shifted);
// 1
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.shift = function() {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Если len = 0, устанавливаем длину массива в 0 и возвращаем undefined
  if (len === 0) {
    Set(obj, "length", +0𝔽, true);
    return undefined;
  }

  // 4. Получаем значение первого элемента массива
  let first = Get(obj, "0");

  // 5. Устанавливаем начальное значение для индекса k
  let k = 1;

  // 6. Повторяем, пока k < len
  while (k < len) {
    // a. Получаем строковые представления индексов from и to
    let from = ToString(𝔽(k));
    let to = ToString(𝔽(k - 1));

    // b. Проверяем, есть ли свойство с индексом from
    let fromPresent = HasProperty(O, from);

    // c. Если свойство с индексом from существует
    if (fromPresent) {
      // i. Получаем значение свойства from
      let fromVal = Get(obj, from);
      // ii. Устанавливаем значение свойства to равным fromVal
      Set(obj, to, fromVal, true);
    } else {
      // e. Если свойства с индексом from нет, удаляем свойство to
      DeletePropertyOrThrow(obj, to);
    }

    // f. Увеличиваем значение k
    k = k + 1;
  }

  // 7. Удаляем последний элемент массива
  DeletePropertyOrThrow(obj, ToString(𝔽(len - 1)));

  // 8. Устанавливаем новую длину массива (len - 1)
  Set(obj, "length", 𝔽(len - 1), true);

  // 9. Возвращаем значение первого элемента массива
  return first;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. If len = 0, then
  a. Perform ? Set(O, "length", +0𝔽, true).
  b. Return undefined.
4. Let first be ? Get(O, "0").
5. Let k be 1.
6. Repeat, while k < len,
  a. Let from be ! ToString(𝔽(k)).
  b. Let to be ! ToString(𝔽(k - 1)).
  c. Let fromPresent be ? HasProperty(O, from).
  d. If fromPresent is true, then
    i. Let fromVal be ? Get(O, from).
    ii. Perform ? Set(O, to, fromVal, true).
  e. Else,
    i. Assert: fromPresent is false.
    ii. Perform ? DeletePropertyOrThrow(O, to).
  f. Set k to k + 1.
7. Perform ? DeletePropertyOrThrow(O, ! ToString(𝔽(len - 1))).
8. Perform ? Set(O, "length", 𝔽(len - 1), true).
9. Return first.
```