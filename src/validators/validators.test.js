import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validateName } from './validators';


describe('validateEmail', () => {
    it('should return empty string for valid noroff.no email', () => {
        expect(validateEmail('user@noroff.no')).toBe('');
    });

    it('should return empty string for valid stud.noroff.no email', () => {
        expect(validateEmail('student@stud.noroff.no')).toBe('');
    });

    it('should return empty string for email with numbers and special characters', () => {
        expect(validateEmail('user123.test@noroff.no')).toBe('');
        expect(validateEmail('user+alias@stud.noroff.no')).toBe('');
    });

    it('should return error message when email is not provided', () => {
        expect(validateEmail('')).toBe('Email is not provided');
        expect(validateEmail(null)).toBe('Email is not provided');
        expect(validateEmail(undefined)).toBe('Email is not provided');
    });

    it('should return error message for non-noroff email', () => {
        expect(validateEmail('user@gmail.com')).toBe('Invalid email provided');
        expect(validateEmail('user@noroff.com')).toBe('Invalid email provided');
    });

    it('should return error message for malformed email', () => {
        expect(validateEmail('notanemail')).toBe('Invalid email provided');
        expect(validateEmail('user@')).toBe('Invalid email provided');
        expect(validateEmail('@noroff.no')).toBe('Invalid email provided');
    });
});

describe('validatePassword', () => {
    it('should return empty string for valid password (8 characters)', () => {
        expect(validatePassword('Abcd1234')).toBe('');
    });

    it('should return empty string for valid password (longer than 8 characters)', () => {
        expect(validatePassword('MySecurePassword123')).toBe('');
        expect(validatePassword('VeryLongPasswordWithManyCharacters')).toBe('');
    });

    it('should return error message for password shorter than 8 characters', () => {
        expect(validatePassword('Abc123')).toBe('Invalid password provided');
        expect(validatePassword('Short')).toBe('Invalid password provided');
        expect(validatePassword('1')).toBe('Invalid password provided');
    });

    it('should return error message for empty password', () => {
        expect(validatePassword('')).toBe('Invalid password provided');
    });

    it('should accept passwords with special characters', () => {
        expect(validatePassword('Pass@#$%^&')).toBe('');
    });

    it('should accept passwords with spaces', () => {
        expect(validatePassword('Pass word!')).toBe('');
    });
});

describe('validateName', () => {
    it('should return empty string for valid name (single character)', () => {
        expect(validateName('A')).toBe('Invalid name provided');
    });

    it('should return empty string for valid name (20 characters)', () => {
        expect(validateName('AbcdefghijklmnopQrst')).toBe('');
    });

    it('should return empty string for valid name (less than 20 characters)', () => {
        expect(validateName('John Doe')).toBe('');
        expect(validateName('Jane')).toBe('');
    });

    it('should return error message for name longer than 20 characters', () => {
        expect(validateName('AbcdefghijklmnopQrstu')).toBe('Invalid name provided');
        expect(validateName('This is a very long name')).toBe('Invalid name provided');
    });

    it('should return empty string for empty name', () => {
        expect(validateName('')).toBe('Invalid name provided');
    });

    it('should accept names with spaces and special characters', () => {
        expect(validateName("Mary-Anne O'Brien")).toBe('');
        expect(validateName('José')).toBe('');
    });

    it('should accept names with numbers', () => {
        expect(validateName('User123')).toBe('');
    });
});