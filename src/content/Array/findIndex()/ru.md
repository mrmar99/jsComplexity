Метод `findIndex()` возвращает **индекс** в массиве, если элемент удовлетворяет условию проверяющей функции. В противном случае возвращается -1.

##### Использование

```js
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
```

##### Примерная внутренняя реализация

```js
// n = arr.length
// k = predicate

// this = arr
Array.prototype.findIndex = function(predicate, thisArg) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Выполняем поиск с использованием предиката и заданного thisArg
  let findRec = FindViaPredicate(obj, len, ASCENDING, predicate, thisArg);

  // 4. Возвращаем индекс найденного элемента или -1, если элемент не найден
  return findRec.[[Index]];
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let findRec be ? FindViaPredicate(O, len, ASCENDING, predicate, thisArg).
4. Return findRec.[[Index]].
```