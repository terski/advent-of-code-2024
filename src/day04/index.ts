import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const xmasVisit = (
    input: string[],
    row: number,
    col: number,
    rowOffset: number = 0,
    colOffset: number = 0,
    depth: number = 0
) => {
    const target = 'XMAS';
    if (
        row < 0 ||
        row >= input.length ||
        col < 0 ||
        col >= input[row].length ||
        input[row][col] !== target[depth]
    ) {
        return 0;
    }

    if (depth === target.length - 1) {
        return 1;
    }

    if (depth > 0) {
        // Continue to search, but don't change directions
        return xmasVisit(
            input,
            row + rowOffset,
            col + colOffset,
            rowOffset,
            colOffset,
            depth + 1
        );
    }

    // Search in all directions
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    let count = 0;
    for (let [dRow, dCol] of directions) {
        count += xmasVisit(
            input,
            row + dRow,
            col + dCol,
            dRow,
            dCol,
            depth + 1
        );
    }

    return count;
};

const masVisit = (input: string[], row: number, col: number) => {
    if (
        row < 1 ||
        row > input.length - 2 ||
        col < 1 ||
        col > input[row].length - 2 ||
        input[row][col] !== 'A'
    ) {
        return 0;
    }
    const pattern = [
        input[row - 1][col - 1],
        input[row + 1][col + 1],
        input[row + 1][col - 1],
        input[row - 1][col + 1],
    ];
    if (
        pattern[0] === pattern[1] ||
        pattern[2] === pattern[3] ||
        pattern.some((v) => v !== 'S' && v !== 'M')
    ) {
        return 0;
    }

    return 1;
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let count = 0;

    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            count += xmasVisit(input, row, col);
        }
    }

    return count;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    let count = 0;

    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            count += masVisit(input, row, col);
        }
    }

    return count;
};

const input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

const simpleInput = `
XMAS
ZMAS
ZZAZ
ZZZS
`;

run({
    part1: {
        tests: [
            {
                input: simpleInput,
                expected: 2,
            },
            {
                input,
                expected: 18,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input,
                expected: 9,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
