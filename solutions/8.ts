function formatInput(rawInput: string) {
	return rawInput
		.split('\n')
		.map((str) => str.split(' ').map((el, i) => (i === 1 ? +el : el)));
}

function executeUntilInfinteLoop(input: [string, number][]) {
	let acc = 0;
	let commandIdx = 0;

	const seenInstr = new Set();

	while (commandIdx < input.length - 1) {
		const [fn, val] = input[commandIdx];
		if (seenInstr.has(commandIdx)) {
			return false;
		}

		seenInstr.add(commandIdx);

		switch (fn) {
			case 'nop':
				commandIdx++;
				break;
			case 'jmp':
				commandIdx += val;
				break;
			case 'acc':
				acc += val;
				commandIdx++;
				break;
			default:
				throw new Error('??' + fn);
		}
	}

	return acc;
}

export function solution1(rawInput: string) {
	const input = formatInput(rawInput);

	let acc = 0;
	let commandIdx = 0;

	const seenInstr = new Set();

	while (commandIdx < input.length) {
		const [fn, val] = input[commandIdx];
		if (seenInstr.has(commandIdx)) {
			return acc;
		}
		seenInstr.add(commandIdx);
		switch (fn) {
			case 'nop':
				commandIdx++;
				break;
			case 'jmp':
				commandIdx += val;
				break;
			case 'acc':
				acc += val;
				commandIdx++;
				break;
			default:
				throw new Error('??' + fn);
		}
	}

	return acc;
}

export function solution2(rawInput: string) {
	const input = formatInput(rawInput);

	for (let i = 0; i < input.length; i++) {
		if (input[i][0] === 'acc') {
			continue;
		}

		const nextInput = [...input];
		nextInput[i] = [input[i][0] === 'jmp' ? 'nop' : 'jmp', input[i][1]];

		const ret = executeUntilInfinteLoop(nextInput);
		if (ret) return ret;
	}

	return 'idk';
}
