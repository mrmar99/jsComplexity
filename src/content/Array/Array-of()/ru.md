Метод `Array.of()` создаёт новый экземпляр массива `Array` из произвольного числа аргументов, вне зависимости от числа или типа аргумента.

Разница между `Array.of()` и конструктором `Array` заключается в обработке целочисленных аргументов: `Array.of(7)` создаёт массив с одним элементом 7, а `Array(7)` создаёт пустой массив со значением свойства `length` равным 7 (Замечание: подразумевается 7 пустых слотов, а не слоты со значением `undefined`).

##### Использование

```js
// true:
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7); // массив с 7 пустыми слотами
Array(1, 2, 3); // [1, 2, 3]
```

##### Примерная внутренняя реализация

```js
// n = items.length

// this = C
Array.of = function(...items) {
  // 1. Получаем количество элементов в items
  let len = items.length;

  // 2. Получаем целое число lenNumber
  let lenNumber = 𝔽(len);

  // 3. Получаем this value
  let C = this;

  // 4. Если IsConstructor(C) равно true
  if (IsConstructor(C)) {
    // a. Создаем массив A с использованием C в качестве конструктора и lenNumber в качестве аргумента
    let A = Construct(C, [lenNumber]);
  } else {
    // b. Иначе создаем массив A с использованием ArrayCreate и len в качестве аргумента
    let A = ArrayCreate(len);
  }

  // 6. Инициализируем счетчик k
  let k = 0;

  // 7. Повторяем, пока k < len
  while (k < len) {
    // a. Получаем значение k-го элемента
    let kValue = items[k];

    // b. Преобразуем k в строку и получаем Pk
    let Pk = ToString(𝔽(k));

    // c. Создаем свойство с ключом Pk и значением kValue в массиве A
    CreateDataPropertyOrThrow(A, Pk, kValue);

    // d. Увеличиваем счетчик k
    k = k + 1;
  }

  // 8. Устанавливаем длину массива A в значение lenNumber
  Set(A, "length", lenNumber, true);

  // 9. Возвращаем созданный массив A
  return A;
};
```

##### ECMAScript

```js
1. Let len be the number of elements in items.
2. Let lenNumber be 𝔽(len).
3. Let C be the this value.
4. If IsConstructor(C) is true, then
   a. Let A be ? Construct(C, « lenNumber »).
5. Else,
   a. Let A be ? ArrayCreate(len).
6. Let k be 0.
7. Repeat, while k < len,
   a. Let kValue be items[k].
   b. Let Pk be ! ToString(𝔽(k)).
   c. Perform ? CreateDataPropertyOrThrow(A, Pk, kValue).
   d. Set k to k + 1.
8. Perform ? Set(A, "length", lenNumber, true).
9. Return A.
```