import {
  INVALID_ARGUMENT_EXCEPTION_TEXT,
  NOTE_UNAVAILABLE_EXCEPTION_TEXT,
  NOTES,
} from './constants';
import {
  calculateNotes,
  calculateNumberOfNotesByValue,
  validateAmount,
} from './utils';

const invalidAmounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 47, 101];

describe('validateAmount', () => {
  it('should throw an error for negative amount', () => {
    expect(() => validateAmount(-100)).toThrowError(
      INVALID_ARGUMENT_EXCEPTION_TEXT,
    );
  });

  it('should throw an error for not valid amounts', () => {
    invalidAmounts.forEach((amount) =>
      expect(() => validateAmount(amount)).toThrowError(
        NOTE_UNAVAILABLE_EXCEPTION_TEXT,
      ),
    );
  });
});

describe('calculateNumberOfNotesByValue', () => {
  it('should return empty result if value less than note value', () => {
    const amounts = [1, 29, 59, 99];
    amounts.forEach((amount) => {
      const note = 100 + Math.ceil(Math.random() * 100);
      expect(calculateNumberOfNotesByValue(amount, note)).toEqual({
        result: null,
        rest: amount,
      });
    });
  });

  it('should return correct number of hundred notes', () => {
    expect(calculateNumberOfNotesByValue(340, 100)).toEqual({
      result: [100, 100, 100],
      rest: 40,
    });
  });

  it('should return correct number of fifty notes', () => {
    expect(calculateNumberOfNotesByValue(130, 50)).toEqual({
      result: [50, 50],
      rest: 30,
    });
  });

  it('should return correct number of twenty notes', () => {
    expect(calculateNumberOfNotesByValue(70, 20)).toEqual({
      result: [20, 20, 20],
      rest: 10,
    });
  });
});

describe('calculateNotes', () => {
  it('should throw an error for negative amount', () => {
    expect(() => calculateNotes(-100)).toThrowError(
      INVALID_ARGUMENT_EXCEPTION_TEXT,
    );
  });

  it('should throw an error for not valid amounts', () => {
    invalidAmounts.forEach((amount) =>
      expect(() => calculateNotes(amount)).toThrowError(
        NOTE_UNAVAILABLE_EXCEPTION_TEXT,
      ),
    );
  });

  it('should return empty array when amount not passed', () => {
    expect(calculateNotes()).toEqual([]);
  });

  it('should return empty array when amount is 0', () => {
    expect(calculateNotes()).toEqual([]);
  });

  it('should return highest available note for strict numbers', () => {
    NOTES.forEach((amount) => expect(calculateNotes(amount)).toEqual([amount]));
  });

  it('should return proper notes', () => {
    const amounts = [
      { amount: 80, expected: [50, 20, 10] },
      { amount: 110, expected: [100, 10] },
      { amount: 120, expected: [100, 20] },
      { amount: 150, expected: [100, 50] },
      { amount: 180, expected: [100, 50, 20, 10] },
      { amount: 290, expected: [100, 100, 50, 20, 20] },
      { amount: 400, expected: [100, 100, 100, 100] },
      { amount: 10000, expected: Array(100).fill(100) },
    ];
    amounts.forEach(({ amount, expected }) =>
      expect(calculateNotes(amount)).toEqual(expected),
    );
  });
});
