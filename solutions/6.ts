function formatInput(rawInput: string) {
	return rawInput
		.split('\n\n')
		.filter(Boolean)
		.map((group) =>
			group
				.split('\n')
				.filter(Boolean)
				.map((answer) => answer.split('').filter(Boolean))
		);
}

export function solution1(rawInput: string) {
	const input = formatInput(rawInput);

	function countUnique(group: string[][]) {
		let allAnswers = new Set();

		group.forEach((answers) => {
			answers.forEach((answer) => {
				allAnswers.add(answer);
			});
		});

		return allAnswers.size;
	}

	return input.reduce((acc, group) => acc + countUnique(group), 0);
}

export function solution2(rawInput: string) {
	const input = formatInput(rawInput);

	function countAll(group: string[][]) {
		let allAnswers = new Map();

		group.forEach((answers) => {
			[...new Set(answers)].forEach((answer) => {
				if (allAnswers.get(answer)) {
					allAnswers.set(answer, allAnswers.get(answer) + 1);
				} else {
					allAnswers.set(answer, 1);
				}
			});
		});

		console.log(group);

		return [...allAnswers.values()].filter(
			(count) => count === group.length
		).length;
	}

	return input.reduce((acc, group) => acc + countAll(group), 0);
}
