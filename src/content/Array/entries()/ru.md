Метод `entries()` возвращает новый объект итератора массива `Array Iterator`, содержащий пары ключ-значение для каждого индекса в массиве.

##### Использование

```js
const arr = ['a', 'b', 'c'];
const arrEntries = arr.entries();

console.log(arrEntries.next().value); // [0, 'a']
console.log(arrEntries.next().value); // [1, 'b']
console.log(arrEntries.next().value); // [2, 'c']
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.entries = function() {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Создаем и возвращаем новый объект итератора для массива obj. 
  // Итератор будет возвращать пары ключ-значение для каждого 
  // элемента в массиве. Параметр key+value указывает, что итератор 
  // должен возвращать как ключ, так и значение для каждого элемента.
  return CreateArrayIterator(obj, key+value);
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Return CreateArrayIterator(O, KEY+VALUE).
```