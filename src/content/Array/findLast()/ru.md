Метод `findLast()` итерируется по массиву в обратном порядке и возвращает **значение** первого найденного в массиве элемента, которое удовлетворяет условию, переданному в callback функции. В противном случае возвращается `undefined`.

##### Использование

```js
const array1 = [5, 12, 50, 130, 44];

const found = array1.findLast((element) => element > 45);

console.log(found);
// Expected output: 130
```

##### Примерная внутренняя реализация

```js
// n = arr.length
// k = predicate

// this = arr
Array.prototype.findLast = function(predicate, thisArg) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Выполняем поиск с использованием предиката 
  // и заданного thisArg в порядке убывания индексов
  let findRec = FindViaPredicate(obj, len, DESCENDING, predicate, thisArg);

  // 4. Возвращаем значение, найденное в результате поиска
  return findRec.[[Value]];
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let findRec be ? FindViaPredicate(O, len, DESCENDING, predicate, thisArg).
4. Return findRec.[[Value]].
```