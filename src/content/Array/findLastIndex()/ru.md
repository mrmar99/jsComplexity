Метод `findLastIndex()` итерируется по массиву в обратном порядке и возвращает **индекс** в массиве, если элемент удовлетворяет условию проверяющей функции. В противном случае возвращается -1.


##### Использование

```js
const arr = [5, 12, 50, 130, 44];

const isLargeNumber = (element) => element > 45;

console.log(arr.findLastIndex(isLargeNumber));
// 3
// arr[3] -> 130
```

##### Примерная внутренняя реализация

```js
// n = arr.length
// k = predicate

// this = arr
Array.prototype.findLastIndex = function(predicate, thisArg) {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Выполняем поиск с использованием предиката
  // и заданного thisArg в порядке убывания индексов
  let findRec = FindViaPredicate(obj, len, DESCENDING, predicate, thisArg);

  // 4. Возвращаем индекс найденного элемента или -1, если элемент не найден
  return findRec.[[Index]];
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. Let findRec be ? FindViaPredicate(O, len, DESCENDING, predicate, thisArg).
4. Return findRec.[[Index]].
```