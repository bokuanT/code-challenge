const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require('../sum_to_n');

test('sum_to_n_a(5) equals 15', () => {
    expect(sum_to_n_a(5)).toBe(15);
});

test('sum_to_n_b(5) equals 15', () => {
    expect(sum_to_n_b(5)).toBe(15);
});

test('sum_to_n_c(5) equals 15', () => {
    expect(sum_to_n_c(5)).toBe(15);
});

test('sum_to_n_a(0) equals 0', () => {
    expect(sum_to_n_a(0)).toBe(0);
});

test('sum_to_n_b(0) equals 0', () => {
    expect(sum_to_n_b(0)).toBe(0);
});

test('sum_to_n_c(0) equals 0', () => {
    expect(sum_to_n_c(0)).toBe(0);
});

test('sum_to_n_a(-1) equals 0', () => {
    expect(sum_to_n_a(-1)).toBe(0);
});

test('sum_to_n_b(-1) equals 0', () => {
    expect(sum_to_n_b(-1)).toBe(0);
});

test('sum_to_n_c(-1) equals 0', () => {
    expect(sum_to_n_c(-1)).toBe(0);
});