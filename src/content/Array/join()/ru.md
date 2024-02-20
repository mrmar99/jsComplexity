Метод `join()` объединяет все элементы массива (или массивоподобного объекта) в строку.

Можно заметить, что во внутренней реализации метода используется конкатенация строк (`+=`), но, если бы мы осуществляли конкатенацию строк вручную в цикле, мы бы заметили, что она работает в несколько раз медленнее, чем метод `join()`. Это обусловлено тем, что движки оптимизируют метод `join()`. Однако, оптимизации могут различаться в зависимости от движка и конкретных условий, поэтому в некоторых сценариях конкатенация строк (`+=`) может работать быстрее метода `join()`.

##### Использование

```js
const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// "Fire,Air,Water"

console.log(elements.join(''));
// "FireAirWater"

console.log(elements.join('-'));
// "Fire-Air-Water"
```

##### Примерная внутренняя реализация

```js
// n = R.length (результирующая строка)

// this = arr
Array.prototype.join = function(separator) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Если separator не определен, устанавливаем sep = ","
  // 4. Иначе устанавливаем sep = separator
  let sep = (separator === undefined) ? "," : ToString(separator);

  // 5. Устанавливаем R как пустую строку
  let R = "";

  // 6. Устанавливаем k = 0
  let k = 0;

  // 7. Повторяем, пока k < len
  while (k < len) {
    // a. Если k > 0, добавляем sep к R
    if (k > 0) {
      R = R + sep;
    }

    // b. Получаем элемент по ключу k из объекта obj
    let element = Get(obj, ToString(𝔽(k)));

    // c. Если element равен undefined или null, устанавливаем next как пустую строку
    //    Иначе, устанавливаем next как строковое представление элемента
    let next = (element === undefined || element === null) ? "" : ToString(element);

    // d. Добавляем next к R
    R = R + next;

    // e. Увеличиваем k на 1
    k = k + 1;
  }

  // 8. Возвращаем R
  return R;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. If separator is undefined, let sep be ",".
4. Else, let sep be ? ToString(separator).
5. Let R be the empty String.
6. Let k be 0.
7. Repeat, while k < len,
  a. If k > 0, set R to the string-concatenation of R and sep.
  b. Let element be ? Get(O, ! ToString(𝔽(k))).
  c. If element is either undefined or null, let next be the empty String; otherwise, let next be ? ToString(element).
  d. Set R to the string-concatenation of R and next.
  e. Set k to k + 1.
8. Return R.
```