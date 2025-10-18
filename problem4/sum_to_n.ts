export function sum_to_n_a(n: number): number {
  if (!Number.isFinite(n) || !Number.isInteger(n)) throw new Error("invalid n");
  if (n <= 0) return 0;
  let s = 0;
  for (let i = 1; i <= n; i++) s += i;
  return s;
}

export function sum_to_n_b(n: number): number {
  if (!Number.isFinite(n) || !Number.isInteger(n)) throw new Error("invalid n");
  if (n <= 0) return 0;
  return (n * (n + 1)) / 2;
}

export function sum_to_n_c(n: number): number {
  if (!Number.isFinite(n) || !Number.isInteger(n)) throw new Error("invalid n");
  if (n <= 0) return 0;
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  return arr.reduce((acc, v) => acc + v, 0);
}

if (require.main === module) {
  const samples = [-1, 0, 1, 5, 10];
  for (const n of samples) {
    console.log(
      JSON.stringify({
        n,
        a: sum_to_n_a(n),
        b: sum_to_n_b(n),
        c: sum_to_n_c(n),
      })
    );
  }
}
