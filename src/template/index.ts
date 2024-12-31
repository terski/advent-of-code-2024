import run from 'aocrunner';

const parseInput = (rawInput: string) => {
    rawInput.split('\n').map(Number)[0];
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return input;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return input;
};

const input = `
4242
`;

run({
    part1: {
        tests: [
            {
                input,
                expected: 4242,
            },
        ],
        solution: part1,
    },
    // part2: {
    //     tests: [
    //         {
    //           input,
    //           expected: 4242,
    //         },
    //     ],
    //     solution: part2,
    // },
    trimTestInputs: true,
    onlyTests: true,
});
