Метод `with()` является аналогом использования скобочной нотации для изменения значения в массиве по индексу. Он возвращает **новый массив**, в котором элемент по заданному индексу заменен заданным значением.

##### Использование

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.with(2, 6)); // [1, 2, 6, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5]
```

##### Примерная внутренняя реализация

```js
// this = arr
Array.prototype.with = function(index, value) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Преобразуем полученный индекс в целое число (или бесконечность)
  let relativeIndex = ToIntegerOrInfinity(index);

  // 4. Если relativeIndex >= 0, устанавливаем actualIndex = relativeIndex
  // 5. Иначе устанавливаем actualIndex = len + relativeIndex
  let actualIndex = (relativeIndex >= 0) ? relativeIndex : (len + relativeIndex);

  // 6. Если actualIndex выходит за пределы arr, выбрасываем исключение RangeError
  if (actualIndex >= len || actualIndex < 0) {
    throw new RangeError("Index out of range");
  }

  // 7. Создаем новый массив A длиной len
  let A = ArrayCreate(len);

  // 8. Устанавливаем начальное значение k = 0
  let k = 0;

  // 9. Повторяем, пока k < len
  while (k < len) {
    // a. Получаем строковый ключ Pk для текущего индекса k
    let Pk = ToString(𝔽(k));

    // b. Если k равен actualIndex, устанавливаем fromValue равным переданному значению value
    // c. Иначе устанавливаем fromValue равным значению, полученному из объекта obj по ключу Pk
    let fromValue = (k === actualIndex) ? value : Get(obj, Pk);

    // d. Устанавливаем свойство с ключом Pk в массиве A со значением fromValue
    CreateDataPropertyOrThrow(A, Pk, fromValue);

    // e. Увеличиваем k на 1
    k = k + 1;
  }

  // 10. Возвращаем созданный массив A
  return A;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let relativeIndex be ? ToIntegerOrInfinity(index).
4. If relativeIndex ≥ 0, let actualIndex be relativeIndex.
5. Else, let actualIndex be len + relativeIndex.
6. If actualIndex ≥ len or actualIndex < 0, throw a RangeError exception.
7. Let A be ? ArrayCreate(len).
8. Let k be 0.
9. Repeat, while k < len,
  a. Let Pk be ! ToString(𝔽(k)).
  b. If k is actualIndex, let fromValue be value.
  c. Else, let fromValue be ? Get(O, Pk).
  d. Perform ! CreateDataPropertyOrThrow(A, Pk, fromValue).
  e. Set k to k + 1.
10. Return A.
```