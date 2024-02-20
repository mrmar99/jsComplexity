Метод `toSorted()` является аналогом метода `sort()`, за исключением того, что метод `toSorted()` возвращает копию исходного массива с отсортированными элементами в порядке возрастания. Не изменяет исходный массив.

##### Использование

```js
const months = ["Mar", "Jan", "Feb", "Dec"];
const sortedMonths = months.toSorted();
console.log(sortedMonths); // ['Dec', 'Feb', 'Jan', 'Mar']
console.log(months); // ['Mar', 'Jan', 'Feb', 'Dec']

const values = [1, 10, 21, 2];
const sortedValues = values.toSorted((a, b) => a - b);
console.log(sortedValues); // [1, 2, 10, 21]
console.log(values); // [1, 10, 21, 2]
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.toSorted = function(comparefn) {
  // 1. Если comparefn не определен или не является функцией, выбрасываем исключение TypeError
  if (comparefn !== undefined && IsCallable(comparefn) === false) {
    throw new TypeError("comparefn must be a callable function or undefined");
  }

  // 2. Преобразуем this в объект, если это необходимо
  let obj = ToObject(this);

  // 3. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 4. Создаем новый массив A длины len
  let A = ArrayCreate(len);

  // 5. Создаем абстрактное замыкание SortCompare с параметрами (x, y), захватывающее comparefn
  // и выполняющее следующие шаги при вызове:
  //    a. Возвращаем результат сравнения элементов массива x и y с использованием функции comparefn
  let SortCompare = new AbstractClosure((x, y) => CompareArrayElements(x, y, comparefn));

  // 6. Получаем отсортированный список sortedList с использованием SortIndexedProperties
  let sortedList = SortIndexedProperties(obj, len, SortCompare, READ_THROUGH_HOLES);

  // 7. Инициализируем счетчик j равным 0
  let j = 0;

  // 8. Повторяем, пока j < len
  while (j < len) {
    //    a. Создаем свойство A[j] и присваиваем ему значение sortedList[j]
    CreateDataPropertyOrThrow(A, ToString(𝔽(j)), sortedList[j]);

    //    b. Увеличиваем j на 1
    j = j + 1;
  }

  // 9. Возвращаем массив A
  return A;
};
```

##### ECMAScript

```js
1. If comparefn is not undefined and IsCallable(comparefn) is false, throw a TypeError exception.
2. Let O be ? ToObject(this value).
3. Let len be ? LengthOfArrayLike(O).
4. Let A be ? ArrayCreate(len).
5. Let SortCompare be a new Abstract Closure with parameters (x, y) that captures comparefn and performs the following steps when called:
  a. Return ? CompareArrayElements(x, y, comparefn).
6. Let sortedList be ? SortIndexedProperties(O, len, SortCompare, READ-THROUGH-HOLES).
7. Let j be 0.
8. Repeat, while j < len,
  a. Perform ! CreateDataPropertyOrThrow(A, ! ToString(𝔽(j)), sortedList[j]).
  b. Set j to j + 1.
9. Return A.
```