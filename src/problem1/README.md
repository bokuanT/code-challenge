# Problem 1

## Task
Provide 3 unique implementations of the following function in JavaScript.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

## Quick start

1. Install dependencies with `npm install`

1. Test `sum_to_n.js` by running `npm test`

Expected output:
```
 PASS  Test/sum_to_n.test.js
  √ sum_to_n_a(5) equals 15 (1 ms)
  √ sum_to_n_b(5) equals 15 (1 ms)                                                                                                                                                                                                           
  √ sum_to_n_c(5) equals 15                                                                                                                                                                                                                  
  √ sum_to_n_a(0) equals 0                                                                                                                                                                                                                   
  √ sum_to_n_b(0) equals 0 (1 ms)                                                                                                                                                                                                            
  √ sum_to_n_c(0) equals 0                                                                                                                                                                                                                   
  √ sum_to_n_a(-1) equals 0 (1 ms)                                                                                                                                                                                                           
  √ sum_to_n_b(-1) equals 0                                                                                                                                                                                                                  
  √ sum_to_n_c(-1) equals 0                                                                                                                                                                                                                  
                                                                                                                                                                                                                                             
Test Suites: 1 passed, 1 total                                                                                                                                                                                                               
Tests:       9 passed, 9 total                                                                                                                                                                                                               
Snapshots:   0 total
Time:        0.299 s, estimated 1 s
Ran all test suites.
```