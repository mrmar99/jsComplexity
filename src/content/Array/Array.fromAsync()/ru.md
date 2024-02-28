Метод `Array.fromAsync()` создаёт новый экземпляр `Array` из асинхронно итерируемого, итерируемого или массивоподобного объекта.

##### Использование

```js
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (e) {
    throw e;
  }
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos';

  try {
    const todos = await fetchData(url);

    function mapFunction(todo) {
      return { 
        id: todo.id,
        title: todo.title,
      };
    }

    const processedData = await Array.fromAsync(todos, mapFunction);

    console.log(processedData);
    /*
    [
      { id: 1, title: "delectus aut autem" },
      { id: 2, title: "quis ut nam facilis et officia qui" },
      // ...
    ]
    */
  } catch (e) {
    console.log(e);
  }
})();
```

##### Примерная внутренняя реализация

```js
// n = asyncItems.length
// k = mapfn

// this = asyncItems
Array.fromAsync = function(asyncItems, mapfn, thisArg) {
  // 1. Определяем C как текущее значение this
  let C = this;

  // 2. Создаем promiseCapability, используя 
  // внутренний конструктор NewPromiseCapability
  let promiseCapability = NewPromiseCapability(%Promise%);

  // 3. Создаем абстрактное замыкание fromAsyncClosure, захватывающее C, mapfn и thisArg
  let fromAsyncClosure = function () {
    // 3a. Если mapfn не определено, устанавливаем mapping в false
    // 3b. Иначе,
    // i. Если mapfn не является вызываемой функцией, выбрасываем исключение TypeError
    // ii. Устанавливаем mapping в true
    let mapping = (mapfn === undefined) ? false : true;

    // 3c. Получаем метод @@asyncIterator объекта asyncItems
    let usingAsyncIterator = GetMethod(asyncItems, @@asyncIterator);

    // 3d. Если метод @@asyncIterator не определен, получаем метод @@iterator
    // 3e. Создаем переменную iteratorRecord и устанавливаем ее в undefined
    let usingSyncIterator = (usingAsyncIterator === undefined) ? GetMethod(asyncItems, @@iterator) : undefined;
    let iteratorRecord;

    // 3f. Если метод @@asyncIterator определен, получаем итератор с использованием ASYNC
    // 3g. Иначе, если метод @@iterator определен, создаем асинхронный итератор с использованием SYNC
    if (usingAsyncIterator !== undefined) {
      iteratorRecord = GetIterator(asyncItems, ASYNC, usingAsyncIterator);
    } else if (usingSyncIterator !== undefined) {
      iteratorRecord = CreateAsyncFromSyncIterator(GetIterator(asyncItems, SYNC, usingSyncIterator));
    }

    // 3h. Если iteratorRecord определен, выполняем шаги для обработки массивоподобного объекта
    if (iteratorRecord !== undefined) {
      // 3h(i). Если C является конструктором, создаем новый массив A
      // 3h(ii). Иначе, создаем новый массив A с длиной 0
      let A = (IsConstructor(C) === true) ? Construct(C) : ArrayCreate(0);

      // 3h(iii). Устанавливаем k в 0
      let k = 0;

      // 3h(iv). Повторяем следующее:
      while (true) {
        // 1. Если k >= 2**53 - 1, выбрасываем исключение TypeError
        if (k >= 2**53 - 1) {
          let error = ThrowCompletion(new TypeError());
          return AsyncIteratorClose(iteratorRecord, error);
        }

        // 2. Получаем строковое представление числа k
        let Pk = ToString(𝔽(k));

        // 3. Вызываем метод [[NextMethod]] итератора и получаем результат
        let nextResult = Call(iteratorRecord.[[NextMethod]], iteratorRecord.[[Iterator]]);

        // 4. Ожидаем результат, так как итератор может возвращать Promise
        nextResult = Await(nextResult);

        // 5. Если результат не является объектом, 
        // выбрасываем исключение TypeError
        if (!IsObject(nextResult)) {
          throw new TypeError();
        }

        // 6. Проверяем, завершен ли итератор
        let done = IteratorComplete(nextResult);

        if (done === true) {
          // 7. Если завершен, устанавливаем 
          // длину массива A в k и возвращаем A
          Set(A, "length", 𝔽(k), true);
          return { [[Type]]: RETURN, [[Value]]: A, [[Target]]: EMPTY };
        }

        // 8. Получаем значение из результата итератора
        let nextValue = IteratorValue(nextResult);

        // 9. Если mapping истинно, вызываем mapfn 
        // с thisArg и аргументами nextValue и k
        let mappedValue = (mapping === true) ? Call(mapfn, thisArg, [nextValue, 𝔽(k)]) : nextValue;

        let mappedValue;
        // 9. Если mapping истинно,
        if (mapping === true) {
          // a. Вызываем mapfn с thisArg и аргументами nextValue и k
          mappedValue = Call(mapfn, thisArg, [nextValue, 𝔽(k)]);
          // b. Если вызов функции mapfn завершен с ошибкой, то закрываем итератор
          ifAbruptCloseAsyncIterator(mappedValue, iteratorRecord);
          // c. Если все хорошо, ожидаем результат,
          // так как mapfn может возвращать Promise
          mappedValue = Await(mappedValue);
          // d. Если вызов функции mapfn завершен с ошибкой, то закрываем итератор
          ifAbruptCloseAsyncIterator(mappedValue, iteratorRecord);
        } else {
          // 10. Если mapping ложно, устанавливаем mappedValue в nextValue
          mappedValue = nextValue;
        }

        // 11. Создаем свойство в массиве A 
        // с ключом Pk и значением mappedValue
        let defineStatus = CreateDataPropertyOrThrow(A, Pk, mappedValue);

        // Если выполнение функции выше завершается с ошибкой, то закрываем итератор
        if (defineStatus instanceof Completion) {
          return AsyncIteratorClose(iteratorRecord, defineStatus);
        }

        // 13. Увеличиваем k на 1 и повторяем шаги
        k = k + 1;
      }
    } else {
      // 3i. NOTE: asyncItems не является AsyncIterable 
      // или Iterable, поэтому предполагаем, что это массивоподобный объект.
      // 3ii. Получаем массивоподобный объект arrayLike
      let arrayLike = ToObject(asyncItems);

      // 3iii. Получаем длину arrayLike
      let len = LengthOfArrayLike(arrayLike);

      // 3iv. Если C является конструктором,
      // создаем новый массив A с длиной len
      // 3v. Иначе, создаем новый массив A
      let A = (IsConstructor(C) === true) ? Construct(C, [𝔽(len)]) : ArrayCreate(len);

      // 3vi. Устанавливаем k в 0
      let k = 0;

      // 3vii. Повторяем следующее, пока k < len
      while (k < len) {
        // 1. Получаем строковое представление числа k
        let Pk = ToString(𝔽(k));
        // 2. Получаем значение k-го элемента arrayLike
        let kValue = Get(arrayLike, Pk);
        // 3. Ожидаем значение, так как
        // элемент массива может быть Promise
        kValue = Await(kValue);

        let mappedValue;
        // 4. Если mapping истинно
        if (mapping === true) {
          // a. Вызываем mapfn с thisArg и аргументами kValue и k
          mappedValue = Call(mapfn, thisArg, [kValue, 𝔽(k)]);
          // b. Ожидаем результат, так как mapfn может возвращать Promise
          mappedValue = Await(mappedValue);
        } else {
          // 5. Если mapping ложно, устанавливаем mappedValue в kValue
          mappedValue = kValue;
        }

        // 6. Создаем свойство в массиве A
        // с ключом Pk и значением mappedValue
        CreateDataPropertyOrThrow(A, Pk, mappedValue);

        // 7. Увеличиваем k на 1 и повторяем шаги
        k = k + 1;
      }

      // 3viii. Устанавливаем длину массива A в len
      Set(A, "length", 𝔽(len), true);

      // 3ix. Возвращаем массив A
      return { [[Type]]: RETURN, [[Value]]: A, [[Target]]: EMPTY };
    }
  };

  // 4. Запускаем выполнение асинхронной функции 
  // AsyncFunctionStart с promiseCapability 
  // и fromAsyncClosure в качестве аргументов
  AsyncFunctionStart(promiseCapability, fromAsyncClosure);

  // 5. Возвращаем promiseCapability.[[Promise]]
  return promiseCapability.[[Promise]];
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