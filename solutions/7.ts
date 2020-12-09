const BAG_COUNT = /(\d+) (.+) bags?/;

function formatInput(rawInput: string) {
	return Object.fromEntries(
		rawInput
			.split('.\n')
			.filter(Boolean)
			.map((line) => {
				const [color, contents] = line.split(' bags contain ');
				return [
					color,
					Object.fromEntries(
						contents
							.split(', ')
							.map((content) => {
								const [, count, childColor] =
									BAG_COUNT.exec(content) || [];
								// no other bags
								if (!count) {
									return false;
								}
								return [childColor, +count];
							})
							.filter(Boolean)
					),
				];
			})
	);
}

const TARGET = 'shiny gold';
export function solution1(rawInput: string) {
	const input = formatInput(rawInput);

	console.log(input)

	const targets: string[] = [TARGET];
	const bagsCanContain = new Set();

	while (targets.length) {
		const target = targets.pop();
		Object.entries(input).forEach(([color, contents]) => {
			if (contents[target]) {
				bagsCanContain.add(color);
				targets.push(color);
			}
		});
	}

	return bagsCanContain.size;
}

function countChildBags(input, target, depth = 1) {
	let count = 1;

	Object.entries(input[target]).forEach(([color, childCount]) => {
		count += childCount * countChildBags(input, color, depth + 1);
	});

	return count;
}

export function solution2(rawInput: string) {
	const input = formatInput(rawInput);

	let count = countChildBags(input, TARGET);

	return count - 1;
}
