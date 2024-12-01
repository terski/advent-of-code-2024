import run from 'aocrunner';

const parseInput = (rawInput: string) => {
    const pairs = rawInput.split('\n').map((s) => {
        return s.split(/\s+/).map((n) => Number(n));
    });
    const first = pairs.map((p) => p[0]).sort();
    const second = pairs.map((p) => p[1]).sort();
    return [first, second];
};

const part1 = (rawInput: string) => {
    const [list1, list2] = parseInput(rawInput);

    return list1.reduce((sum, _, i) => {
        return sum + Math.abs(list1[i] - list2[i]);
    }, 0);
};

const part2 = (rawInput: string) => {
    const [list1, list2] = parseInput(rawInput);
    const map = new Map();
    list2.forEach((val) => {
        map.set(val, (map.has(val) ? map.get(val) : 0) + 1);
    });

    return list1.reduce((sum, val) => sum + val * (map.get(val) ?? 0), 0);
};

const input = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

run({
    part1: {
        tests: [
            {
                input,
                expected: 11,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input,
                expected: 31,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
