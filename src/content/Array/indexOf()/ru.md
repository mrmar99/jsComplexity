Метод `indexOf()` возвращает первый индекс, по которому данный элемент может быть найден в массиве или -1, если такого индекса нет.

##### Использование

```js
const arr = [2, 5, 9];
arr.indexOf(2); // 0
arr.indexOf(7); // -1
arr.indexOf(9, 2); // 2
arr.indexOf(2, -1); // -1
arr.indexOf(2, -3); // 0
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.indexOf = function(searchElement, fromIndex) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Если длина массива равна 0, возвращаем -1
  if (len === 0) {
    return -1;
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
    return -1;
  } else if (n === -Infinity) {
    n = 0;
  }

  let k;
  // 8. Если n ≥ 0, устанавливаем k = n
  // 9. Иначе, устанавливаем k = len + n, если k < 0, устанавливаем k в 0
  if (n >= 0) {
    k = n;
  } else {
    k = len + n;

    if (k < 0) {
      k = 0;
    }
  }

  // 10. Пока k < len
  while (k < len) {
    // a. Проверяем, есть ли свойство с ключом k
    let kPresent = HasProperty(obj, ToString(𝔽(k)));

    // b. Если свойство есть
    if (kPresent) {
      // i. Получаем значение элемента по ключу k
      let elementK = Get(obj, ToString(𝔽(k)));

      // ii. Если значения равны, возвращаем индекс k
      if (IsStrictlyEqual(searchElement, elementK)) {
        return 𝔽(k);
      }
    }

    // c. Увеличиваем k на 1
    k = k + 1;
  }

  // 11. Если ничего не найдено, возвращаем -1
  return -1;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. If len = 0, return -1𝔽.
4. Let n be ? ToIntegerOrInfinity(fromIndex).
5. Assert: If fromIndex is undefined, then n is 0.
6. If n = +∞, return -1𝔽.
7. Else if n = -∞, set n to 0.
8. If n ≥ 0, then
   a. Let k be n.
9. Else,
   a. Let k be len + n.
   b. If k < 0, set k to 0.
10. Repeat, while k < len,
    a. Let kPresent be ? HasProperty(O, ! ToString(𝔽(k))).
    b. If kPresent is true, then
       i. Let elementK be ? Get(O, ! ToString(𝔽(k))).
       ii. If IsStrictlyEqual(searchElement, elementK) is true, return 𝔽(k).
    c. Set k to k + 1.
11. Return -1𝔽.
```