Метод `Array.from()` создаёт новый экземпляр `Array` из массивоподобного или итерируемого объекта.

##### Использование

```js
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7); // массив с 7 пустыми слотами
Array(1, 2, 3); // [1, 2, 3]
```

##### Примерная внутренняя реализация

```js
// n = items.length
// k = mapfn

// this = Array (Array.from(...)) / someArray (someArray.from(...))
Array.from = function(items, mapfn, thisArg) {
  // 1. Определяем C как текущее значение this
  let C = this;

  // 2. Если mapfn не определен, устанавливаем mapping в false
  // 3. Иначе, если mapfn не является вызываемой функцией, 
  // выбрасываем исключение TypeError
  // и устанавливаем mapping в true
  let mapping;
  if (mapfn === undefined) {
    mapping = false;
  } else {
    if (!IsCallable(mapfn)) {
      throw new TypeError();
    }
    mapping = true;
  }

  // 4. Получаем метод @@iterator из items
  let usingIterator = GetMethod(items, Symbol.iterator);

  // 5. Если usingIterator определен, выполняем следующие шаги
  if (usingIterator !== undefined) {
    // a. Если C является конструктором, устанавливаем A как новый объект, созданный с помощью C
    // b. Иначе устанавливаем A как новый массив с длиной 0
    let A = (IsConstructor(C)) ? Construct(C) : ArrayCreate(0);

    // c. Получаем итератор для items
    let iteratorRecord = GetIteratorFromMethod(items, usingIterator);

    // d. Устанавливаем k в 0
    let k = 0;

    // e. Повторяем
    while (true) {
      // i. Если k >= 2^53 - 1, выбрасываем исключение TypeError
      // и закрываем итератор
      if (k >= 2**53 - 1) {
        let error = ThrowCompletion(new TypeError());
        return IteratorClose(iteratorRecord, error);
      }

      // ii. Переводим k в строку Pk
      let Pk = ToString(𝔽(k));

      // iii. Получаем следующее значение из итератора
      let next = IteratorStepValue(iteratorRecord);

      // iv. Если next равно DONE, устанавливаем длину A в k и возвращаем A
      if (next === DONE) {
        Set(A, "length", 𝔽(k), true);
        return A;
      }

      // v. Если mapping равно true, вызываем mapfn с аргументами next и 𝔽(k),
      //    присваиваем результат переменной mappedValue
      let mappedValue = (mapping) ? Call(mapfn, thisArg, [next, 𝔽(k)]) : next;

      // vi. Устанавливаем Pk в mappedValue в объекте A
      let defineStatus = CreateDataPropertyOrThrow(A, Pk, mappedValue);

      // vii. Если возникло исключение при выполнении defineStatus, закрываем итератор
      IfAbruptCloseIterator(defineStatus, iteratorRecord);

      // viii. Увеличиваем k на 1
      k = k + 1;
    }
  }

  // 6. Примечание: items не является итерируемым, поэтому предполагаем, что это объект похожий на массив

  // 7. Преобразуем items в объект arrayLike
  let arrayLike = ToObject(items);

  // 8. Получаем длину arrayLike
  let len = LengthOfArrayLike(arrayLike);

  // 9. Если C является конструктором, устанавливаем A как новый объект, созданный с помощью C
  // 10. Иначе устанавливаем A как новый массив с длиной len
  let A = (IsConstructor(C)) ? Construct(C, [𝔽(len)]) : ArrayCreate(len);

  // 11. Устанавливаем k в 0
  let k = 0;

  // 12. Повторяем, пока k < len
  while (k < len) {
    // a. Переводим k в строку Pk
    let Pk = ToString(𝔽(k));

    // b. Получаем значение kValue из arrayLike по ключу Pk
    let kValue = Get(arrayLike, Pk);

    // c. Если mapping равно true, вызываем mapfn с аргументами kValue и 𝔽(k),
    //    присваиваем результат переменной mappedValue
    let mappedValue = (mapping) ? Call(mapfn, thisArg, [kValue, 𝔽(k)]) : kValue;

    // d. Устанавливаем Pk в mappedValue в объекте A
    CreateDataPropertyOrThrow(A, Pk, mappedValue);

    // e. Увеличиваем k на 1
    k = k + 1;
  }

  // 13. Устанавливаем длину A в len
  Set(A, "length", 𝔽(len), true);

  // 14. Возвращаем A
  return A;
};
```

##### ECMAScript

```js
1. Let C be the this value.
2. If mapfn is undefined, then
   a. Let mapping be false.
3. Else,
   a. If IsCallable(mapfn) is false, throw a TypeError exception.
   b. Let mapping be true.
4. Let usingIterator be ? GetMethod(items, @@iterator).
5. If usingIterator is not undefined, then
   a. If IsConstructor(C) is true, then
      i. Let A be ? Construct(C).
   b. Else,
      i. Let A be ! ArrayCreate(0).
   c. Let iteratorRecord be ? GetIteratorFromMethod(items, usingIterator).
   d. Let k be 0.
   e. Repeat,
      i. If k ≥ 2**53 - 1, then
         1. Let error be ThrowCompletion(a newly created TypeError object).
         2. Return ? IteratorClose(iteratorRecord, error).
      ii. Let Pk be ! ToString(𝔽(k)).
      iii. Let next be ? IteratorStepValue(iteratorRecord).
      iv. If next is DONE, then
         1. Perform ? Set(A, "length", 𝔽(k), true).
         2. Return A.
      v. If mapping is true, then
         1. Let mappedValue be Completion(Call(mapfn, thisArg, « next, 𝔽(k) »)).
         2. IfAbruptCloseIterator(mappedValue, iteratorRecord).
      vi. Else,
         1. Let mappedValue be next.
      vii. Let defineStatus be Completion(CreateDataPropertyOrThrow(A, Pk, mappedValue)).
      viii. IfAbruptCloseIterator(defineStatus, iteratorRecord).
      ix. Set k to k + 1.
6. NOTE: items is not an Iterable so assume it is an array-like object.
7. Let arrayLike be ! ToObject(items).
8. Let len be ? LengthOfArrayLike(arrayLike).
9. If IsConstructor(C) is true, then
   a. Let A be ? Construct(C, « 𝔽(len) »).
10. Else,
   a. Let A be ? ArrayCreate(len).
11. Let k be 0.
12. Repeat, while k < len,
   a. Let Pk be ! ToString(𝔽(k)).
   b. Let kValue be ? Get(arrayLike, Pk).
   c. If mapping is true, then
      i. Let mappedValue be ? Call(mapfn, thisArg, « kValue, 𝔽(k) »).
   d. Else,
      i. Let mappedValue be kValue.
   e. Perform ? CreateDataPropertyOrThrow(A, Pk, mappedValue).
   f. Set k to k + 1.
13. Perform ? Set(A, "length", 𝔽(len), true).
14. Return A.
```
