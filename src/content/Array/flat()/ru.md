Метод `flat()` возвращает новый массив, в котором все элементы вложенных подмассивов были рекурсивно "подняты" на указанный уровень depth.

##### Использование

```js
const arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

##### Примерная внутренняя реализация

```js
// n = A.length (результирующий массив)

// this = arr
Array.prototype.flat = function(depth) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let sourceLen = LengthOfArrayLike(obj);

  // 3. Если depth не определено, устанавливаем depthNum в 1
  let depthNum = 1;

  // 4. Если depth определено, преобразуем его в целое число
  if (depth !== undefined) {
    depthNum = ToIntegerOrInfinity(depth);

    // 4a. Если depthNum < 0, устанавливаем depthNum в 0
    if (depthNum < 0) {
      depthNum = 0;
    }
  }

  // 5. Создаем новый массив A
  let A = ArraySpeciesCreate(obj, 0);

  // 6. Выполняем процедуру сглаживания массива FlattenIntoArray
  FlattenIntoArray(A, obj, sourceLen, 0, depthNum);

  // 7. Возвращаем полученный массив A
  return A;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let sourceLen be ? LengthOfArrayLike(O).
3. Let depthNum be 1.
4. If depth is not undefined, then
  a. Set depthNum to ? ToIntegerOrInfinity(depth).
  b. If depthNum < 0, set depthNum to 0.
5. Let A be ? ArraySpeciesCreate(O, 0).
6. Perform ? FlattenIntoArray(A, O, sourceLen, 0, depthNum).
7. Return A.
```