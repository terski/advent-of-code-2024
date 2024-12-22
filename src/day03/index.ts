import run from 'aocrunner';

const parseInput = (rawInput: string) => [rawInput.split('\n').join()];

const cleanLine = (input: string): string => {
    const start = input.indexOf("don't(");
    if (start === -1) return input;

    const end = input.indexOf('do()', start);
    if (end === -1) return input.substring(0, start);

    return cleanLine(input.substring(0, start) + input.substring(end + 4));
};

const parseLine = (input: string): number => {
    let result = 0,
        cur = 0;
    while (cur < input.length) {
        const next = input.indexOf('mul(', cur);
        if (next === -1) break;

        const start = next + 4;
        cur = start;

        const end = input.indexOf(')', start);
        if (end === -1) break;

        const integers = input.substring(start, end);

        if ((integers.match(/,/g) || []).length !== 1) {
            continue;
        }

        const [first, second] = integers.split(',');
        if (!first || !second) {
            continue;
        }

        const integerRegex = /^-?\d+$/;
        if (
            !integerRegex.test(first.trim()) ||
            !integerRegex.test(second.trim())
        ) {
            continue;
        }

        result += Number.parseInt(first) * Number.parseInt(second);
    }
    return result;
};

const part1 = (rawInput: string) => {
    const lines = parseInput(rawInput);
    return lines.reduce((sum, line) => {
        return sum + parseLine(line);
    }, 0);
};

const part2 = (rawInput: string) => {
    const lines = parseInput(rawInput);
    return lines.reduce((sum, line) => {
        return sum + parseLine(cleanLine(line));
    }, 0);
};

const input = `
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`;

const input2 = `
don't()do()xmul(2,4)&mul[3,7]!^don't()
_mul(5,5)don't()+mul(32,64](mul(11,8)undon't()do()do()do()?mul(8,5))
`;

run({
    part1: {
        tests: [
            {
                input,
                expected: 161,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: input2,
                expected: 48,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
