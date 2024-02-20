Метод `find()` возвращает **значение** первого найденного в массиве элемента, которое удовлетворяет условию, переданному в callback функции. В противном случае возвращается `undefined`.

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

console.log([4, 6, 8, 12].find(isPrime)); // undefined
console.log([4, 5, 8, 12].find(isPrime)); // 5
```

##### Примерная внутренняя реализация

```js
// n = arr.length
// k = predicate

// this = arr
Array.prototype.find = function(predicate, thisArg) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Выполняем поиск с использованием предиката и заданного thisArg
  let findRec = FindViaPredicate(obj, len, ASCENDING, predicate, thisArg);

  // 4. Возвращаем значение найденного элемента
  return findRec.[[Value]];
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let findRec be ? FindViaPredicate(O, len, ASCENDING, predicate, thisArg).
4. Return findRec.[[Value]].
```