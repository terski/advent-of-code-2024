import run from 'aocrunner';
import { AsNumberMatrix } from '../utils';

const isSafe = (arr: number[], tolerance = 0) => {
    if (arr.length < 2) return true;

    let direction = arr[0] < arr[1] ? 'increasing' : 'decreasing';
    for (let i = 0; i < arr.length - 1; i++) {
        const diff = arr[i + 1] - arr[i];
        if (
            diff === 0 ||
            (diff > 0 && direction === 'decreasing') ||
            (diff < 0 && direction === 'increasing') ||
            Math.abs(diff) > 3
        ) {
            tolerance--;
            if (tolerance < 0) return false;
            for (let j = 0; j < arr.length; j++) {
                if (isSafe(arr.toSpliced(j, 1), tolerance)) {
                    return true;
                }
            }
            return false;
        }
    }
    return true;
};

const parseInput = (rawInput: string) => AsNumberMatrix(rawInput);

const part1 = (rawInput: string) => {
    const matrix = parseInput(rawInput);
    return matrix.reduce((sum, line) => {
        return sum + (isSafe(line) ? 1 : 0);
    }, 0);
};

const part2 = (rawInput: string) => {
    const tolerance = 1;
    const matrix = parseInput(rawInput);
    return matrix.reduce((sum, line) => {
        return sum + (isSafe(line, tolerance) ? 1 : 0);
    }, 0);
};

const input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

run({
    part1: {
        tests: [
            {
                input,
                expected: 2,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input,
                expected: 4,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
