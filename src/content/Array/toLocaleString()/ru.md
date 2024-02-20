Метод `toLocaleString()` возвращает строковое представление элементов массива. Элементы преобразуются в строки с использованием своих собственных методов `toLocaleString` и эти строки разделяются локале-зависимой строкой (например, запятой «,»).

##### Использование

```js
const number = 1337;
const date = new Date();
const myArr = [number, date, "foo"];

const str = myArr.toLocaleString();

console.log(str);
// напечатает строку с number, date, "foo" через запятую
// date представляет собой текущую дату в виде DD.MM.YYYY hh:mm:ss,
// если работает под германской локалью (de-DE) с временной зоной Европа/Берлин
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.toLocaleString = function (reserved1, reserved2) {
  // 1. Преобразуем this в объект, если это необходимо
  let array = ToObject(this);

  // 2. Получаем длину массивоподобного объекта array
  let len = LengthOfArrayLike(array);

  // 3. Получаем разделитель строк, соответствующий текущей локали
  /* implementation-defined list-separator String value */
  let separator = ",";

  // 4. Инициализируем пустую строку R
  let R = "";

  // 5. Устанавливаем начальное значение k = 0
  let k = 0;

  // 6. Повторяем, пока k < len
  while (k < len) {
    // a. Если k > 0, добавляем к R разделитель
    if (k > 0) {
      R = R + separator;
    }

    // b. Получаем следующий элемент массива
    let nextElement = Get(array, ToString(𝔽(k)));

    // c. Если nextElement не является undefined или null, то
    if (nextElement !== undefined && nextElement !== null) {
      // i. Получаем строковое представление элемента, вызывая его toLocaleString
      let S = ToString(Invoke(nextElement, "toLocaleString"));

      // ii. Добавляем S к R
      R = R + S;
    }

    // d. Увеличиваем k на 1
    k = k + 1;
  }

  // 7. Возвращаем результат R
  return R;
};
```

##### ECMAScript

```js
1. Let array be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(array).
3. Let separator be the implementation-defined list-separator String value appropriate for the host environment's current locale (such as ", ").
4. Let R be the empty String.
5. Let k be 0.
6. Repeat, while k < len,
  a. If k > 0, then
    i. Set R to the string-concatenation of R and separator.
  b. Let nextElement be ? Get(array, ! ToString(𝔽(k))).
  c. If nextElement is neither undefined nor null, then
    i. Let S be ? ToString(? Invoke(nextElement, "toLocaleString")).
    ii. Set R to the string-concatenation of R and S.
  d. Set k to k + 1.
7. Return R.
```