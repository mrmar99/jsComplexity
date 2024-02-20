Метод `pop()` удаляет последний элемент из массива и возвращает его значение.

##### Использование

```js
const nums = [1, 2, 3, 4];

console.log(nums); // [1, 2, 3, 4]

const popped = nums.pop();

console.log(myFish); // [1, 2, 3]

console.log(popped); // 4
```

##### Примерная внутренняя реализация

```js
// this = arr
Array.prototype.pop = function() {
  // 1. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 2. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 3. Если длина массива равна 0, устанавливаем длину в 0 и возвращаем undefined
  if (len === 0) {
    Set(obj, "length", +0𝔽, true);
    return undefined;
  }

  // 4. Уменьшаем длину массива на 1
  let newLen = 𝔽(len - 1);

  // 5. Получаем индекс удаляемого элемента
  let index = ToString(newLen);

  // 6. Получаем значение удаляемого элемента
  let element = Get(obj, index);

  // 7. Удаляем свойство с полученным индексом
  DeletePropertyOrThrow(obj, index);

  // 8. Устанавливаем новую длину массива
  Set(obj, "length", newLen, true);

  // 9. Возвращаем удаленный элемент
  return element;
};
```

##### ECMAScript

```js
1. Let O be ? ToObject(this value).
2. Let len be ? LengthOfArrayLike(O).
3. If len = 0, then
  a. Perform ? Set(O, "length", +0𝔽, true).
  b. Return undefined.
4. Else,
  a. Assert: len > 0.
  b. Let newLen be 𝔽(len - 1).
  c. Let index be ! ToString(newLen).
  d. Let element be ? Get(O, index).
  e. Perform ? DeletePropertyOrThrow(O, index).
  f. Perform ? Set(O, "length", newLen, true).
  g. Return element.
```