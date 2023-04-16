const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */

const discardNext = '--discard-next'; //excludes the next element of the array from the transformed array
const discardPrev = '--discard-prev'; //excludes the previous element of the array from the transformed array
const doubleNext = '--double-next'; //duplicates the next element of the array in the transformed array
const doublePrev = '--double-prev'; //duplicates the previous element of the array in the transformed array

function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  let lastCommand;
  const res = [];

  arr.forEach((elem, index, arr) => {
    if (elem === discardNext) {
      lastCommand = discardNext;
    } else if (elem === discardPrev) {
      if (arr[index - 2] !== discardNext) {
        res.pop();
      }
      lastCommand = discardPrev;
    } else if (elem === doubleNext ) {
      if (arr[index + 1]) {
        res.push(arr[index + 1]);
      }
      lastCommand = doubleNext
    } else if (elem === doublePrev) {
      if (arr[index - 1] && arr[index - 2] !== discardNext) {
        res.push(arr[index - 1]);
      }
      lastCommand = doublePrev;
    } else if (lastCommand === discardNext) {
      lastCommand = 'nothing';
    } else {
      res.push(elem);
      lastCommand = 'push';
    }
  });

  return res;
}

module.exports = {
  transform
};
