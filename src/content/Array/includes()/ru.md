Метод `includes()` определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого `true` или `false`.

##### Использование

```js
const arr = [1, 2, 3];

console.log(arr.includes(2));
// true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// true

console.log(pets.includes('at'));
// false
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.includes = function(searchElement, fromIndex) {
// 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Если длина массива равна 0, возвращаем false
  if (len === 0) {
    return false;
  }

  // 4. Преобразуем величину fromIndex в целое число (или бесконечность)
  let n = ToIntegerOrInfinity(fromIndex);

  // 5. Проверка: если fromIndex не определен, устанавливаем n в 0
  if (fromIndex === undefined) {
    n = 0;
  }

  // 6. Если n = +∞, возвращаем false
  // 7. Иначе, если n = -∞, устанавливаем n в 0
  if (n === +Infinity) {
    return false;
  } else if (n === -Infinity) {
    n = 0;
  }

  let k;
  // 8. Если n >= 0, устанавливаем k = n
  // 9. Иначе, устанавливаем k = len + n и если k < 0, устанавливаем k в 0
  if (n >= 0) {
    k = n;
  } else {
    k = len + n;

    if (k < 0) {
      k = 0;
    }
  }

  // 10. Повторяем, пока k < len
  while (k < len) {
    // a. Получаем элемент массива с индексом k
    let elementK = Get(obj, ToString(𝔽(k)));

    // b. Если элементK равен searchElement, возвращаем true
    if (SameValueZero(searchElement, elementK)) {
      return true;
    }

    // c. Увеличиваем k на 1
    k = k + 1;
  }

  // 11. Если не найдено совпадение, возвращаем false
  return false;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. If len = 0, return false.
4. Let n be ? ToIntegerOrInfinity(fromIndex).
5. Assert: If fromIndex is undefined, then n is 0.
6. If n = +∞, return false.
7. Else if n = -∞, set n to 0.
8. If n ≥ 0, then
  a. Let k be n.
9. Else,
  a. Let k be len + n.
  b. If k < 0, set k to 0.
10. Repeat, while k < len,
  a. Let elementK be ? Get(O, ! ToString(𝔽(k))).
  b. If SameValueZero(searchElement, elementK) is true, return true.
  c. Set k to k + 1.
11. Return false.
```