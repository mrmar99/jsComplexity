Метод `values()` возвращает новый объект итератора массива `Array Iterator`, содержащий значения для каждого индекса в массиве.

##### Использование

```js
// 1.
const arr = ["w", "y", "k", "o", "p"];
const eArr = arr.values();

for (let letter of eArr) {
  console.log(letter);
}

// или

console.log(eArr.next().value);
console.log(eArr.next().value);
console.log(eArr.next().value);
console.log(eArr.next().value);
console.log(eArr.next().value);

// w
// y
// k
// o
// p
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.values = function() {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Создаем и возвращаем новый объект итератора для массива obj. 
  // Итератор будет возвращать значение для каждого 
  // элемента в массиве. Параметр value указывает, что итератор 
  // должен возвращать только значение для каждого элемента.
  return CreateArrayIterator(obj, value);
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Return CreateArrayIterator(O, VALUE).
```