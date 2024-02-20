Метод `sort()` на месте сортирует элементы массива и возвращает отсортированный массив. Сортировка не обязательно [устойчива](https://ru.wikipedia.org/wiki/Устойчивая_сортировка). Порядок сортировки по умолчанию соответствует порядку кодовых точек Unicode.

В JavaScript, метод `sort()` для массивов использует алгоритм сортировки, который обычно является алгоритмом сортировки слиянием (Merge Sort) или быстрой сортировки (Quick Sort). Оба эти алгоритма имеют временную сложность `O(n log(n))` в среднем случае.

В спецификации ECMAScript не определено конкретное требование к реализации метода `sort()`. Различные JavaScript-движки могут использовать разные стратегии сортировки в зависимости от размера массива и других факторов.

##### Использование

```js
const fruit = ["арбузы", "бананы", "Вишня"];
fruit.sort(); // ['Вишня', 'арбузы', 'бананы']

const scores = [1, 2, 10, 21];
scores.sort(); // [1, 10, 2, 21]

const things = ["слово", "Слово", "1 Слово", "2 Слова"];
things.sort(); // ['1 Слово', '2 Слова', 'Слово', 'слово']
// В Unicode, числа находятся перед буквами в верхнем регистре,
// а те, в свою очередь, перед буквами в нижнем регистре.
```

##### Примерная внутренняя реализация

```js
// n = arr.length

// this = arr
Array.prototype.sort = function(comparefn) {
  // 1. Если comparefn не определен или не является функцией, выбрасываем исключение TypeError
  if (comparefn !== undefined && !IsCallable(comparefn)) {
    throw new TypeError();
  }

  // 2. Преобразуем this в объект, если необходимо
  let obj = ToObject(this);

  // 3. Получаем длину массивоподобного объекта obj
  let len = LengthOfArrayLike(obj);

  // 4. Создаем замыкание SortCompare
  let SortCompare = function(x, y) {
    return CompareArrayElements(x, y, comparefn);
  };

  // 5. Сортируем свойства массива obj с использованием замыкания SortCompare и SKIP-HOLES
  let sortedList = SortIndexedProperties(obj, len, SortCompare, SKIP-HOLES);

  // 6. Получаем количество элементов в отсортированном списке
  let itemCount = sortedList.length;

  // 7. Инициализируем индекс j
  let j = 0;

  // 8. Копируем отсортированные элементы обратно в массив obj
  while (j < itemCount) {
    // a. Устанавливаем значение на позицию j в массиве obj
    Set(obj, ToString(𝔽(j)), sortedList[j], true);

    // b. Увеличиваем индекс j
    j = j + 1;
  }

  // 9. Удаляем лишние свойства, если они есть
  // (остались после сортировки)
  while (j < len) {
    // a. Удаляем свойство на позиции j
    DeletePropertyOrThrow(obj, ToString(𝔽(j)));

    // b. Увеличиваем индекс j
    j = j + 1;
  }

  // 10. Возвращаем отсортированный массив obj
  return obj;
};
```

##### ECMAScript

```js
1. If comparefn is not undefined and IsCallable(comparefn) is false, throw a TypeError exception.
2. Let obj be ? ToObject(this value).
3. Let len be ? LengthOfArrayLike(obj).
4. Let SortCompare be a new Abstract Closure with parameters (x, y) that captures comparefn and performs the following steps when called:
  a. Return ? CompareArrayElements(x, y, comparefn).
5. Let sortedList be ? SortIndexedProperties(obj, len, SortCompare, SKIP-HOLES).
6. Let itemCount be the number of elements in sortedList.
7. Let j be 0.
8. Repeat, while j < itemCount,
  a. Perform ? Set(obj, ! ToString(𝔽(j)), sortedList[j], true).
  b. Set j to j + 1.
9. NOTE: The call to SortIndexedProperties in step 5 uses SKIP-HOLES. The remaining indices are deleted to preserve the number of holes that were detected and excluded from the sort.
10. Repeat, while j < len,
  a. Perform ? DeletePropertyOrThrow(obj, ! ToString(𝔽(j))).
  b. Set j to j + 1.
11. Return obj.
```