import run from 'aocrunner';

const parseInput = (rawInput: string) => {
    let row = 0,
        col = 0;
    const map = rawInput.split('\n').map((s, i) => {
        const j = s.indexOf('^');
        if (j > -1) {
            row = i;
            col = j;
        }
        return s.split('');
    });
    return { row, col, map };
};

const visit = (row: number, col: number, map: string[][]) => {
    /**
     * find the next position
     * if the next position is off the grid, end
     * if the next position is an #, turn right
     * else move to the next position and mark it as visited
     */
    const maxCount = map.length * map[0].length;
    let directions = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    let cur = 0,
        count = 1;

    while (true) {
        const nextRow = row + directions[cur][0];
        const nextCol = col + directions[cur][1];
        if (
            count >= maxCount ||
            nextRow < 0 ||
            nextRow >= map.length ||
            nextCol < 0 ||
            nextCol >= map[row].length
        ) {
            break;
        }

        if (map[nextRow][nextCol] === '#') {
            cur = (cur + 1) % directions.length;
        } else {
            row = nextRow;
            col = nextCol;
            if (map[row][col] === '.') {
                count++;
            }
            if (map[row][col] === `${cur}`) {
                return -1; // Loop detected
            }
            map[row][col] = `${cur}`;
        }
    }
    return count;
};

const resultsInLoop = (row: number, col: number, map: string[][]) => {
    return visit(row, col, map) === -1;
};

const duplicate = (arr: string[][]): string[][] => arr.map((row) => [...row]);

const part1 = (rawInput: string) => {
    const { row, col, map } = parseInput(rawInput);
    return visit(row, col, map);
};

const part2 = (rawInput: string) => {
    const { row, col, map } = parseInput(rawInput);
    let count = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] !== '.') continue;

            const dup = duplicate(map);
            dup[i][j] = '#';
            if (resultsInLoop(row, col, dup)) {
                count++;
            }
        }
    }

    return count;
};

const input = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

run({
    part1: {
        tests: [
            {
                input,
                expected: 41,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input,
                expected: 6,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
