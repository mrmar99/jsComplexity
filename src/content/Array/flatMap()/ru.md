Метод `flatMap()` сначала применяет функцию к каждому элементу, а затем преобразует полученный результат в плоскую структуру и помещает в новый массив. Это идентично `map` функции, с последующим применением функции `flat` с параметром `depth` (глубина) равным 1, но `flatMap` часто бывает полезным, так как работает немного более эффективно.

##### Использование

```js
let arr1 = [1, 2, 3, 4];

arr1.map((x) => [x * 2]);
// [[2], [4], [6], [8]]

arr1.flatMap((x) => [x * 2]);
// [2, 4, 6, 8]

// выравнивается только один уровень
arr1.flatMap((x) => [[x * 2]]);
// [[2], [4], [6], [8]]
```

##### Примерная внутренняя реализация

```js
// n = A.length (результирующий массив)
// k = mapperFunction

// this = arr
Array.prototype.flatMap = function(mapperFunction, thisArg) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let sourceLen = LengthOfArrayLike(obj);

  // 3. Если mapperFunction не является callable, выбрасываем исключение TypeError
  if (!IsCallable(mapperFunction)) {
    throw new TypeError("mapperFunction is not callable");
  }

  // 4. Создаем новый массив A с использованием ArraySpeciesCreate
  let A = ArraySpeciesCreate(obj, 0);

  // 5. Выполняем FlattenIntoArray для слияния элементов массива
  FlattenIntoArray(A, obj, sourceLen, 0, 1, mapperFunction, thisArg);

  // 6. Возвращаем новый массив A
  return A;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let sourceLen be ? LengthOfArrayLike(O).
3. If IsCallable(mapperFunction) is false, throw a TypeError exception.
4. Let A be ? ArraySpeciesCreate(O, 0).
5. Perform ? FlattenIntoArray(A, O, sourceLen, 0, 1, mapperFunction, thisArg).
6. Return A.
```