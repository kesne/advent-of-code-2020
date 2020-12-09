function formatInput(rawInput: string) {
  return rawInput
    .split('\n')
    .filter(Boolean)
    .map((num) => parseInt(num, 10));
}

const TARGET = 2020;

function nSum(arr: any[], n = 2, target = TARGET): number | number[] | null {
  if (n === 1) {
    return arr.includes(target) ? target : null;
  }

  for (let i = 0; i < arr.length; i++) {
    const num1 = arr[i];
    let other;
    if (n === 2) {
      other = [arr.slice(i).find((num) => num1 + num) === target];
    } else {
      other = nSum(arr, n - 1, target - num1);
    }
    if (other && other[0]) {
      return [num1, ...other];
    }
  }
}

export function solution1(rawInput: string) {
  const input = formatInput(rawInput);

  let ret;
  input.some((num1, i) => {
    const num2 = input.slice(i).find((num2) => num1 + num2 === TARGET);
    if (num2) {
      ret = num1 * num2;
      return true;
    }
  });

  return ret;
}

export function solution2(rawInput: string) {
  const input = formatInput(rawInput);

  return nSum(input, 3);
}
