import run from 'aocrunner';

const parseInput = (rawInput: string) => {
    return rawInput.split('\n');
};

const allOperators = [
    (a: number, b: number) => a + b,
    (a: number, b: number) => a * b,
    (a: number, b: number) => Number(a.toString() + b.toString()),
];

const isTrue = (
    result: number,
    operands: number[],
    operators: ((a: number, b: number) => number)[]
) => {
    for (let operator of operators) {
        const cur = operator(operands[0], operands[1]);

        if (operands.length > 2) {
            if (isTrue(result, [cur, ...operands.slice(2)], operators)) {
                return true;
            }
        } else {
            if (cur === result) {
                return true;
            }
        }
    }
    return false;
};

const part1 = (rawInput: string) => {
    const equations = parseInput(rawInput);
    return equations.reduce((sum, line) => {
        const [resultStr, operandsStr] = line.split(':');
        const result = Number(resultStr);
        const operands = operandsStr.split(/\s+/).map((o) => Number(o));

        if (
            isTrue(
                result,
                operands,
                allOperators.slice(0, allOperators.length - 1)
            )
        ) {
            sum += result;
        }
        return sum;
    }, 0);
};

const part2 = (rawInput: string) => {
    const equations = parseInput(rawInput);
    return equations.reduce((sum, line) => {
        const [resultStr, operandsStr] = line.split(':');
        const result = Number(resultStr);
        const operands = operandsStr.split(/\s+/).map((o) => Number(o));

        if (isTrue(result, operands, allOperators)) {
            sum += result;
        }
        return sum;
    }, 0);
};

const input = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;

run({
    part1: {
        tests: [
            {
                input,
                expected: 3749,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input,
                expected: 11387,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
