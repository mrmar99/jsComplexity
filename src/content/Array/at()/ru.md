[ECMAScript](https://262.ecma-international.org/#sec-array.prototype.at)

Метод `at()` принимает значение в виде целого числа и возвращает элемент массива с данным индексом. В качестве аргумента метод принимает положительные и отрицательные числа. При отрицательном значении отсчёт происходит с конца массива.

**Использование:**

```js
const arr = [5, 12, 8, 130, 44];
arr.at(2); // 8
```

```js
Array.prototype.at = function(index) {
  // 1. Преобразуем this (arr) в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину псевдомассива obj
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
  return Get(obj, !ToString(𝔽(k)));
}
```
