//Assume that:
//+ n is any integer
//+ Input will always produce a result lesser than Number.MAX_SAFE_INTEGER.

var sum_to_n_a = function (n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function (n) {
    return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n, acc = 0) {
    if (n === 0) {
        return acc;
    }
    return sum_to_n_c(n - 1, acc + n);
};