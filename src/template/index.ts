import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return input;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return input;
};

const input = `
hello
`;

run({
    part1: {
        tests: [
            {
              input,
              expected: "hello",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
              input,
              expected: "hello",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
});
