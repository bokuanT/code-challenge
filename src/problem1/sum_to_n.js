/**
* Recursively calculates the sum of all numbers from 1 to `n`. Returns 0 if `n` is less than 0
* @param {integer} n - The number to sum up to
* @returns {integer} sum - The sum of all numbers from 1 to `n`
*/
var sum_to_n_a = function(n) {
    // Time complexity: O(n)
    // Space complexity: O(n)
    if (n < 0) return 0;

    if (n === 0) {
        return 0;
    }
    return n + sum_to_n_a(n - 1);
};

/**
* Calculates the sum of all numbers from 1 to `n` using a for loop. Returns 0 if `n` is less than 0
* @param {integer} n - The number to sum up to
* @returns {integer} sum - The sum of all numbers from 1 to `n`
*/
var sum_to_n_b = function(n) {
    // Time complexity: O(n)
    // Space complexity: O(1)
    if (n < 0) return 0;

    var sum = 0;
    for (var i = 0; i <= n; i++) {
        sum += i;
    }
    return sum;
};

/**
* Calculates the sum of all numbers from 1 to `n` using a mathematical formula. Returns 0 if `n` is less than 0
* @param {integer} n - The number to sum up to
* @returns {integer} sum - The sum of all numbers from 1 to `n`
*/
var sum_to_n_c = function(n) {
    // Time complexity: O(1)
    // Space complexity: O(1)
    if (n < 0) return 0;

    return (n * (n + 1)) / 2;
};

module.exports = { sum_to_n_a, sum_to_n_b, sum_to_n_c };
