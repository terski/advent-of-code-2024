import run from 'aocrunner';

const parseInput = (rawInput: string) => {
    const lines = rawInput.split('\n');
    let cur = 0;
    const precedents = new Map<string, string[]>();
    const antecedents = new Map<string, string[]>();

    while (true) {
        if (!lines[cur].length) {
            cur++;
            break;
        }

        const [before, after] = lines[cur].split('|');

        const p = precedents.get(after) ?? [];
        p.push(before);
        precedents.set(after, p);

        const a = antecedents.get(before) ?? [];
        a.push(after);
        antecedents.set(before, a);
        cur++;
    }

    const updates = [];
    while (cur < lines.length) {
        updates.push(lines[cur].split(','));
        cur++;
    }

    return { precedents, antecedents, updates };
};

const part1 = (rawInput: string) => {
    const { precedents, antecedents, updates } = parseInput(rawInput);
    const result = updates.reduce((sum, pages) => {
        if (isInOrder(pages, precedents, antecedents)) {
            const midpoint = Number(pages[(pages.length - 1) / 2]);
            sum += midpoint;
        }
        return sum;
    }, 0);
    return result;
};

const part2 = (rawInput: string) => {
    const { precedents, antecedents, updates } = parseInput(rawInput);
    const compare = compareFn(precedents, antecedents);
    const result = updates.reduce((sum, pages) => {
        if (!isInOrder(pages, precedents, antecedents)) {
            const sorted = pages.toSorted(compare);
            const midpoint = Number(sorted[(pages.length - 1) / 2]);
            sum += midpoint;
        }
        return sum;
    }, 0);

    return result;
};

const compareFn = (
    precedents: Map<string, string[]>,
    antecedents: Map<string, string[]>
) => {
    return (a: string, b: string) => {
        if (precedents.has(a)) {
            const mustComeBefore = precedents.get(a);
            if (mustComeBefore?.includes(b)) {
                return -1;
            }
        }

        if (antecedents.has(a)) {
            const mustComeAfter = antecedents.get(a);
            if (mustComeAfter?.includes(b)) {
                return 1;
            }
        }
        return 0;
    };
};

const isInOrder = (
    pages: string[],
    precedents: Map<string, string[]>,
    antecedents: Map<string, string[]>
) => {
    const prefix = [];
    const suffix = [...pages.slice(1)];

    for (const page of pages) {
        // Look up the pages that must come before
        // If any items in suffix appear in the list, we are out of order
        if (precedents.has(page)) {
            const mustComeBefore = precedents.get(page);
            for (const s of suffix) {
                if (mustComeBefore?.includes(s)) {
                    return false;
                }
            }
        }

        // Look up the pages that must come after
        // If any items in the prefix appear in this list, we are out of order
        if (antecedents.has(page)) {
            const mustComeAfter = antecedents.get(page);
            for (const p of prefix) {
                if (mustComeAfter?.includes(p)) {
                    return false;
                }
            }
        }
        prefix.push(page);
        suffix.shift();
    }
    return true;
};

const input = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

run({
    part1: {
        tests: [
            {
                input,
                expected: 143,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input,
                expected: 123,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
