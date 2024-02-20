Метод `toReversed()` является аналогом метода `reverse()`, за исключением того, что метод `toReversed()` возвращает копию исходного массива с элементами в обратном порядке. Не изменяет исходный массив.

##### Использование

```js
const items = [1, 2, 3];
console.log(items); // [1, 2, 3]

const reversedItems = items.toReversed();
console.log(reversedItems); // [3, 2, 1]
console.log(items); // [1, 2, 3]
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.toReversed = function() {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Создаем новый массив A длины len
  let A = ArrayCreate(len);

  // 4. Устанавливаем начальное значение k в 0
  let k = 0;

  // 5. Повторяем, пока k < len
  while (k < len) {
    // a. Получаем строковое представление индекса len - k - 1
    let from = ToString(𝔽(len - k - 1));

    // b. Получаем строковое представление индекса k
    let Pk = ToString(𝔽(k));

    // c. Получаем значение элемента из объекта obj по индексу from
    let fromValue = Get(obj, from);

    // d. Устанавливаем новый элемент в массив A по индексу k
    CreateDataPropertyOrThrow(A, Pk, fromValue);

    // e. Увеличиваем k на 1
    Set k to k + 1;
  }

  // 6. Возвращаем новый массив A
  return A;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let A be ? ArrayCreate(len).
4. Let k be 0.
5. Repeat, while k < len,
  a. Let from be ! ToString(𝔽(len - k - 1)).
  b. Let Pk be ! ToString(𝔽(k)).
  c. Let fromValue be ? Get(O, from).
  d. Perform ! CreateDataPropertyOrThrow(A, Pk, fromValue).
  e. Set k to k + 1.
6. Return A.
```