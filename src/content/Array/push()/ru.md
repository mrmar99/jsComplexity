Метод `push()` добавляет один или более элементов в конец массива и возвращает **новую длину** массива.

Когда мы используем `push()` для добавления нескольких элементов в конец массива, это может занять дополнительную память. Если текущая длина массива не достаточна для хранения всех новых элементов, то может потребоваться выделение дополнительной памяти.

В большинстве современных движков JavaScript такие операции управления памятью автоматизированы, и они заботятся о расширении массива и выделении необходимой памяти. Как следствие, сложность по памяти для метода `push()` остается амортизированной `O(1)` в среднем случае, но иногда может возникнуть необходимость в выделении дополнительной памяти, что приведет к временным затратам.

##### Использование

```js
const nums = [1, 2];
const total = nums.push(3, 4);

console.log(sports); // [1, 2, 3, 4]
console.log(total); // 4
```

##### Примерная внутренняя реализация

```js
// n = items.length

// this = arr
Array.prototype.push = function (...items) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Получаем количество элементов в аргументах (items)
  let argCount = items.length;

  // 4. Если сумма len и argCount больше 2^53 - 1, выбрасываем исключение TypeError
  if (len + argCount > 2**53 - 1) {
    throw new TypeError();
  }

  // 5. Для каждого элемента E в аргументах items делаем следующее:
  for (let E of items) {
    // a. Устанавливаем в obj значение E по ключу,
    // равному текущей длине len (преобразованной в строку)
    Set(obj, ToString(𝔽(len)), E, true);
    
    // b. Увеличиваем len на 1
    len = len + 1;
  }

  // 6. Устанавливаем в obj значение "length"
  // равным новой длине len (преобразованной в строку)
  Set(obj, "length", 𝔽(len), true);

  // 7. Возвращаем новую длину массива в виде числа
  return 𝔽(len);
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let argCount be the number of elements in items.
4. If len + argCount > 2**53 - 1, throw a TypeError exception.
5. For each element E of items, do
  a. Perform ? Set(O, ! ToString(𝔽(len)), E, true).
  b. Set len to len + 1.
6. Perform ? Set(O, "length", 𝔽(len), true).
7. Return 𝔽(len).
```