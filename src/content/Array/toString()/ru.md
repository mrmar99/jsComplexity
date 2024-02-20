Метод `toString()` возвращает строковое представление указанного массива и его элементов.

Метод `toString()` вызывает метод `join()`, не передавая параметр `separator` (в `join()` по умолчанию равен `,`).

##### Использование

```js
const arr = [1, 2, 'a', '1a'];

console.log(arr.toString());
// "1,2,a,1a"
```

##### Примерная внутренняя реализация

```js
// n = R.length (результирующая строка)

// this = arr
Array.prototype.toString = function() {
  // 1. Преобразуем this в объект, если это необходимо
  let array = ToObject(this);

  // 2. Получаем метод "join" объекта array
  let func = Get(array, "join");

  // 3. Если func не является вызываемой функцией,
  // устанавливаем func во встроенную функцию %Object.prototype.toString%
  if (!IsCallable(func)) {
    func = %Object.prototype.toString%;
  }

  // 4. Возвращаем результат вызова функции func на объекте array
  return Call(func, array);
};
```

##### ECMAScript

```js
1. Let array be ? ToObject(this value).
2. Let func be ? Get(array, "join").
3. If IsCallable(func) is false, set func to the intrinsic function %Object.prototype.toString%.
4. Return ? Call(func, array).
```