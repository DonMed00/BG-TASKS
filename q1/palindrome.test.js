const { isPalindrome } = require('./palindrome');

describe('Palindrome Tests', () => {
    it('should identify a simple palindrome', () => {
        expect(isPalindrome('Deleveled')).toBe(true);
    });

    it('should identify a palindrome with numbers', () => {
        expect(isPalindrome('12321')).toBe(true);
    });

    it('should return false for non-palindromes', () => {
        expect(isPalindrome('hello')).toBe(false);
    });

    it('should identify a palindrome ignoring any special characters', () => {
        const str = "123,43:)21";
        expect(isPalindrome(str)).toBe(true);
    });
});

