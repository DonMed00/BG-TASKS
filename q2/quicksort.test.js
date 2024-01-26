const { quicksort } = require('./quicksort');

// Unit tests for the quicksort function
describe('quicksort', () => {
    it('should sort an empty array', () => {
        expect(quicksort([])).toEqual([]);
    });

    it('should sort an array with a single element', () => {
        expect(quicksort([5])).toEqual([5]);
    });

    it('should sort an array with elements in random order', () => {
        const input = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
        const expected = [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9];
        expect(quicksort(input)).toEqual(expected);
    });

    it('should sort an array with elements already in sorted order', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(quicksort(input)).toEqual(input);
    });
});
