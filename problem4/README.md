# pb4 – Sum to n in TypeScript

This module implements three distinct ways to compute the summation `1 + 2 + ... + n` in TypeScript and documents their complexity and efficiency.

## Assumptions
- `n` is an integer. If `n <= 0`, the functions return `0`.
- The result fits within `Number.MAX_SAFE_INTEGER`.

## Implementations
- `sum_to_n_a(n)`: iterative for-loop accumulating from 1 to `n`.
  - Time: O(n)
  - Space: O(1)
  - Notes: stable and easy to reason about; good when you need to interleave side checks per iteration.

- `sum_to_n_b(n)`: arithmetic series formula `n * (n + 1) / 2`.
  - Time: O(1)
  - Space: O(1)
  - Notes: fastest approach; beware overflow if result exceeds `Number.MAX_SAFE_INTEGER` (not the case under our assumption).

- `sum_to_n_c(n)`: functional style using `Array.from` + `reduce`.
  - Time: O(n)
  - Space: O(n) due to the generated array
  - Notes: concise but allocates memory for the sequence; mainly for demonstration of a different style.

## Quick Run
You can run a small demo directly:

```
node ./dist/sum_to_n.js   # after build
```

or with ts-node (if available):

```
ts-node ./sum_to_n.ts
```

Sample output:

```
{"n":0,"a":0,"b":0,"c":0}
{"n":1,"a":1,"b":1,"c":1}
{"n":5,"a":15,"b":15,"c":15}
{"n":10,"a":55,"b":55,"c":55}
```

## Install & Build
If you want to compile to JavaScript:

```
npm install
npm run build
node dist/sum_to_n.js
```

## Extras
- For extremely large `n`, consider `BigInt` (`(BigInt(n) * (BigInt(n) + 1n)) / 2n`), and return `bigint`.
- Input validation guards are included to reject non-integer `n`.