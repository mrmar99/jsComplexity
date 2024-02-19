Метод `Array.isArray()` возвращает `true`, если объект является массивом и `false`, если он массивом не является.

##### Использование

```js
// true:
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(Array.prototype);

// false:
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray("Array");
Array.isArray(true);
Array.isArray(false);
Array.isArray({ __proto__: Array.prototype });
```

##### Примерная внутренняя реализация

```js
Array.isArray = function(arg) {
  return isArray(arg);
};
```

##### ECMAScript

```js
1. Return ? IsArray(arg).
```