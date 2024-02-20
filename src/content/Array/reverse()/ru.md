Метод `reverse()` на месте обращает порядок следования элементов массива. Первый элемент массива становится последним, а последний — первым.

##### Использование

```js
const array1 = [1, 2, 3];
console.log('array1:', array1);
// [1, 2, 3]

const reversed = array1.reverse();
console.log('reversed:', reversed);
// [3, 2, 1]

// Меняется и оригинальный массив
console.log('array1:', array1);
// [3, 2, 1]
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.reverse = function () {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Вычисляем середину массива
  let middle = Math.floor(len / 2);

  // 4. Устанавливаем начальное значение lower в 0
  let lower = 0;

  // 5. Повторяем, пока lower не станет равным middle
  while (lower !== middle) {
    // a. Вычисляем upper и upperP
    let upper = len - lower - 1;
    let upperP = ToString(𝔽(upper));

    // b. Вычисляем lowerP
    let lowerP = ToString(𝔽(lower));

    // c. Проверяем, существует ли свойство с ключом lowerP в объекте obj
    let lowerExists = HasProperty(obj, lowerP);

    // d. Если свойство существует, получаем его значение
    if (lowerExists) {
      let lowerValue = Get(obj, lowerP);
    }

    // e. Проверяем, существует ли свойство с ключом upperP в объекте obj
    let upperExists = HasProperty(obj, upperP);

    // f. Если свойство существует, получаем его значение
    if (upperExists) {
      let upperValue = Get(obj, upperP);
    }

    // h. Если оба свойства существуют, меняем их значения местами
    if (lowerExists && upperExists) {
      Set(obj, lowerP, upperValue, true);
      Set(obj, upperP, lowerValue, true);
    }
    // i. Если только нижнее свойство существует, устанавливаем его значение на место верхнего и удаляем верхнее свойство
    else if (!lowerExists && upperExists) {
      Set(obj, lowerP, upperValue, true);
      DeletePropertyOrThrow(obj, upperP);
    }
    // j. Если только верхнее свойство существует, удаляем нижнее свойство и устанавливаем значение верхнего на его место
    else if (lowerExists && !upperExists) {
      DeletePropertyOrThrow(obj, lowerP);
      Set(obj, upperP, lowerValue, true);
    }
    // k. Если оба свойства отсутствуют, ничего не делаем
    else {
      // Нет необходимости в дополнительных действиях
    }

    // l. Увеличиваем lower на 1
    lower = lower + 1;
  }

  // 6. Возвращаем измененный объект
  return obj;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let middle be floor(len / 2).
4. Let lower be 0.
5. Repeat, while lower ≠ middle,
  a. Let upper be len - lower - 1.
  b. Let upperP be ! ToString(𝔽(upper)).
  c. Let lowerP be ! ToString(𝔽(lower)).
  d. Let lowerExists be ? HasProperty(O, lowerP).
  e. If lowerExists is true, then
    i. Let lowerValue be ? Get(O, lowerP).
  f. Let upperExists be ? HasProperty(O, upperP).
  g. If upperExists is true, then
    i. Let upperValue be ? Get(O, upperP).
  h. If lowerExists is true and upperExists is true, then
    i. Perform ? Set(O, lowerP, upperValue, true).
    ii. Perform ? Set(O, upperP, lowerValue, true).
  i. Else if lowerExists is false and upperExists is true, then
    i. Perform ? Set(O, lowerP, upperValue, true).
    ii. Perform ? DeletePropertyOrThrow(O, upperP).
  j. Else if lowerExists is true and upperExists is false, then
    i. Perform ? DeletePropertyOrThrow(O, lowerP).
    ii. Perform ? Set(O, upperP, lowerValue, true).
  k. Else,
    i. Assert: lowerExists and upperExists are both false.
    ii. NOTE: No action is required.
  l. Set lower to lower + 1.
6. Return O.
```