Метод `keys()` возвращает новый **итератор массива** `Array Iterator`, содержащий ключи каждого индекса в массиве.

##### Использование

```js
const arr = ['a', 'b', 'c'];
const iterator = arr.keys();

for (const key of iterator) {
  console.log(key);
}

// 0
// 1
// 2
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.keys = function() {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Создаем и возвращаем новый объект итератора для массива obj. 
  // Итератор будет возвращать ключ для каждого 
  // элемента в массиве. Параметр key указывает, что итератор 
  // должен возвращать только ключ для каждого элемента.
  return CreateArrayIterator(obj, key);
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Return CreateArrayIterator(O, KEY).
```