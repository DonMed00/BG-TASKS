const { isPalindrome } = require('./palindrome');

describe('Palindrome Tests', () => {
    test('should identify a simple palindrome', () => {
        expect(isPalindrome('Deleveled')).toBe(true);
    });

    test('should identify a palindrome with numbers', () => {
        expect(isPalindrome('12321')).toBe(true);
    });

    test('should return false for non-palindromes', () => {
        expect(isPalindrome('hello')).toBe(false);
    });

    test('should identify a palindrome ignoring any special characters', () => {
        const str = "123,43:)21";
        expect(isPalindrome(str)).toBe(true);
    });
});

