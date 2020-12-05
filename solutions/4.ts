function getLocation(str: string) {
  return str.split("").reduce(
    ([row, column], el) => {
      if (el === "F") {
        return [row.slice(0, row.length / 2), column];
      } else if (el === "B") {
        return [row.slice(row.length / 2), column];
      } else if (el === "L") {
        return [row, column.slice(0, column.length / 2)];
      } else {
        return [row, column.slice(column.length / 2)];
      }
    },
    [
      Array.from({ length: 128 }, (_, i) => i),
      Array.from({ length: 8 }, (_, i) => i),
    ]
  );
}

function formatInput(rawInput: string) {
  return rawInput.split("\n").filter(Boolean);
}

export function solution1(rawInput: string) {
  const input = formatInput(rawInput);

  return input
    .map((str) => getLocation(str).flat())
    .reduce((acc, [row, column]) => {
      return Math.max(acc, row * 8 + column);
    }, 0);
}

export function solution2(rawInput: string) {
  const input = formatInput(rawInput);

  const seatIDs = input
    .map((str) => getLocation(str).flat())
    .map(([row, column]) => {
      return row * 8 + column;
    });

  for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 8; j++) {
      const seatID = i * 8 + j;
      if (
        !seatIDs.includes(seatID) &&
        seatIDs.includes(seatID + 1) &&
        seatIDs.includes(seatID - 1)
      ) {
        return seatID;
      }
    }
  }
}
