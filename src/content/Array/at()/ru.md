Метод `at()` принимает значение в виде целого числа и возвращает элемент массива с данным индексом. В качестве аргумента метод принимает положительные и отрицательные числа. При отрицательном значении отсчёт происходит с конца массива.

##### Использование

```js
const arr = [1, 3, 2];

console.log(arr.at(1)); // 3
console.log(arr.at(-1)); // 2
console.log(arr.at(3)); // undefined
```

##### Примерная внутренняя реализация

```js
// this = arr
Array.prototype.at = function(index) {
  // 1. Преобразуем this в объект, если это необходимо
  // Здесь это не нужно, так как arr уже является объектом
  // (массив - это объект)
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Преобразуем полученный индекс в целое число (или бесконечность)
  let relativeIndex = ToIntegerOrInfinity(index);

  // 4. Если relativeIndex >= 0, устанавливаем k = relativeIndex
  // 5. Иначе устанавливаем k = len + relativeIndex
  let k = (relativeIndex >= 0) ? relativeIndex : (len + relativeIndex);

  // 6. Если k выходит за пределы arr, возвращаем undefined
  if (k < 0 || k >= len) {
    return undefined;
  }

  // 7. Возвращаем значение, полученное из объекта obj по ключу k
  return Get(obj, ToString(𝔽(k)));
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let relativeIndex be ? ToIntegerOrInfinity(index).
4. If relativeIndex ≥ 0, then
  a. Let k be relativeIndex.
5. Else,
  a. Let k be len + relativeIndex.
6. If k < 0 or k ≥ len, return undefined.
7. Return ? Get(O, ! ToString(𝔽(k))).
```