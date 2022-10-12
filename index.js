const _ = require('./dist/index.js') // require module

console.log(_.eq([], []))
console.log(_.eq([0, 'text'], [0, 'text']))
console.log(_.eq([0, 'text', [], {}], [0, 'text', [], {}]))
console.log(_.eq({}, {}))
console.log(_.eq({ a: 0 }, { a: 0 }))
console.log(_.eq({ a: 0, b: [] }, { a: 0, b: [] }))
// true

/* Array */

console.log(_.nth(['first', 'last'], -1))
// last

for (let num of _.range(10, 0)) {
  console.log(num)
}
// 10 9 8 7 6 5 4 3 2 1
for (let num of _.range(0, 10, 2)) {
  console.log(num)
}
// 0 2 4 6 8 

console.log(_.sum([1, 2, 3, 4]))
// 10

console.log(_.includes([0, 'text', [], {}], {}))
// true
console.log(_.includesBy([0, 1, 2, 3], 3.5, Math.floor))
// true

console.log(_.uniq([0, 'text', 'text', [], {}, {}]))
// [0, 'text', [], {}]

console.log(_.uniqBy([
  { id: 0 },
  { id: 1 },
  { id: 0 },
  { id: 2 },
], 'id'))
// [{ id: 0 }, { id: 1 }, { id: 2 }]
console.log(_.uniqBy([2, 1.5, 1, 3.5], Math.floor))
// [1, 2, 3.5]

console.log(_.uniqSorted([1, 1, 1, 2, 3, 3]))
// [1, 2, 3]

console.log(_.uniqSortedBy([1, 1.5, 2, 3.5], Math.floor))
// [1, 2, 3.5]

console.log(_.chunk([0, 'text', [], {}], 3))
// [[0, 'text', []], [{}]]

const users = [
  {
    name: 'John',
    age: 18,
    deleted: false
  },
  {
    name: 'Jane',
    age: 13,
    deleted: false
  },
  {
    name: 'Bob',
    age: 69,
    deleted: true
  },
]

console.log(_.countif(users, '.age > 13'))
// 2
console.log(_.countif(users, ['&&', '.age > 13', '.deleted === false']))
// 1

console.log(_.filter(users, _.must({ age: '> 16' })))
// [{ name: 'John', age: 18, deleted: false }, { name: 'Bob', age: 69, deleted: true }]
console.log(_.filter(users, { age: 13 })) // _.matches shorthand
// [{ name: 'Jane', age: 13, deleted: false }]
console.log(_.filter(users, ['name', 'John'])) // _.matchesProperty shorthand
// [{ name: 'John', age: 18, deleted: false }]
console.log(_.filter(users, 'deleted')) // _.property shorthand
// [{ name: 'Bob', age: 69, deleted: true }]

console.log(_.distill(users, _.must({ age: ['&&', '>= 13', '<= 18'] })))
// [[John, Jane], [Bob]]
console.log(_.distill(users, { age: 13 })) // _.matches shorthand
// [[Jane], [John, Bob]]
console.log(_.distill(users, ['name', 'John'])) // _.matchesProperty shorthand
// [[John], [Jane, Bob]]
console.log(_.distill(users, 'deleted')) // _.property shorthand
// [[Bob], [John, Jane]]

console.log(_.find(users, _.must({ age: '> 16' })))
// { name: 'John', age: 18, deleted: false }
console.log(_.find(users, { age: 13 })) // _.matches shorthand
// { name: 'Jane', age: 13, deleted: false }
console.log(_.find(users, ['name', 'John'])) // _.matchesProperty shorthand
// { name: 'John', age: 18, deleted: false }
console.log(_.find(users, 'deleted')) // _.property shorthand
// { name: 'Bob', age: 69, deleted: true }

console.log(_.findIndexes(users, _.must({ age: '> 16' })))
// [0, 2]
console.log(_.findIndexes(users, { age: 13 })) // _.matches shorthand
// [1]
console.log(_.findIndexes(users, ['name', 'John'])) // _.matchesProperty shorthand
// [0]
console.log(_.findIndexes(users, 'deleted')) // _.property shorthand
// [2]

console.log(_.zip(['id', 0, 1, 2], ['username', 'int', 'bob', 'npm']))
// [['id', 'username'], [0, 'int'], [1, 'bob'], [2, 'npm']]

console.log(_.search([1, 2, 3], 2))
// 1
console.log(_.search([1, 2, 3], 4))
// -1

console.log(_.searchFit([1, 2, 3], 1))
// [0]
console.log(_.searchFit([1, 2, 3], 0))
// [0, 2]

const nums = [1, 2, 3]
console.log(_.insert(4, nums, 3))
// [1, 2, 3, 4]
console.log(nums)
// [1, 2, 3, 4] (mutated)
console.log(_.insert(0, nums, _.searchFit(nums, 0)[0]))
// [0, 1, 2, 3, 4]

console.log(_.insertSorted(1.5, nums))
// [0, 1, 1.5, 2, 3, 4]