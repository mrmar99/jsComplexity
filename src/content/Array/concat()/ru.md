Метод `concat()` возвращает новый массив, состоящий из массива, на котором он был вызван, соединённого с другими массивами и/или значениями, переданными в качестве аргументов.

##### Использование

```js
const arr1 = ['a', 'b', 'c'];
const arr2 = ['d', 'e', 'f'];
const g = 'g';
const arr3 = arr1.concat(arr2, g);

console.log(arr3); // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

##### Примерная внутренняя реализация

```js
// n = arr1.length
// m = items.length
// k = items[i].length (max)

// this = arr1
Array.prototype.concat = function(...items) {
  // 1. Преобразуем this в объект, если это необходимо
  // Здесь это не нужно, так как arr1 уже является объектом
  // (массив - это объект)
  let obj = ToObject(this);

  // 2. Создаем новый массив A длины 0
  let A = ArraySpeciesCreate(obj, 0);

  // 3. Инициализируем счетчик n
  let n = 0;

  // 4. Добавляем obj в начало items
  items.unshift(obj);

  // 5. Для каждого элемента E в items
  for (const E of items) {
    // a. Проверяем, расширяем ли элемент
    let spreadable = IsConcatSpreadable(E);

    // b. Если расширяем
    if (spreadable === true) {
      // i. Получаем длину массивоподобного объекта E
      let len = LengthOfArrayLike(E);

      // ii. Проверяем, не превысит ли длина нового массива максимальное значение
      if (n + len > 2**53 - 1) {
        throw new TypeError("Concatenation result exceeds the maximum array length");
      }

      // iii. Инициализируем счетчик k
      let k = 0;

      // iv. Повторяем, пока k < len
      while (k < len) {
        // 1. Получаем строковое представление индекса k
        let Pk = ToString(𝔽(k));

        // 2. Проверяем, существует ли свойство с индексом k в E
        let exists = HasProperty(E, Pk);

        // 3. Если свойство существует
        if (exists === true) {
          // a. Получаем подэлемент под индексом k
          let subElement = Get(E, Pk);

          // b. Добавляем подэлемент в новый массив
          CreateDataPropertyOrThrow(A, ToString(𝔽(n)), subElement);
        }

        // 4. Увеличиваем счетчик n и k
        n = n + 1;
        k = k + 1;
      }
    } else {
      // c. Если нерасширяем
      // i. Добавляем элемент E в новый массив
      CreateDataPropertyOrThrow(A, ToString(𝔽(n)), E);

      // ii. Увеличиваем счетчик n
      n = n + 1;
    }
  }

  // 6. Устанавливаем длину нового массива в значение n
  Set(A, "length", 𝔽(n), true);

  // 7. Возвращаем новый массив
  return A;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let A be ? ArraySpeciesCreate(O, 0).
3. Let n be 0.
4. Prepend O to items.
5. For each element E of items, do
  a. Let spreadable be ? IsConcatSpreadable(E).
  b. If spreadable is true, then
    i. Let len be ? LengthOfArrayLike(E).
    ii. If n + len > 253 - 1, throw a TypeError exception.
    iii. Let k be 0.
    iv. Repeat, while k < len,
      1. Let P be ! ToString(𝔽(k)).
      2. Let exists be ? HasProperty(E, P).
      3. If exists is true, then
        a. Let subElement be ? Get(E, P).
        b. Perform ? CreateDataPropertyOrThrow(A, ! ToString(𝔽(n)), subElement).
      4. Set n to n + 1.
      5. Set k to k + 1.
  c. Else,
    i. NOTE: E is added as a single item rather than spread.
    ii. If n ≥ 253 - 1, throw a TypeError exception.
    iii. Perform ? CreateDataPropertyOrThrow(A, ! ToString(𝔽(n)), E).
    iv. Set n to n + 1.
6. Perform ? Set(A, "length", 𝔽(n), true).
7. Return A.
```