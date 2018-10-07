import {
  INVALID_ARGUMENT_EXCEPTION_TEXT,
  NOTE_UNAVAILABLE_EXCEPTION_TEXT,
  NOTES,
} from './constants';

export const validateAmount = (amount: number) => {
  if (amount < 0) {
    throw new Error(INVALID_ARGUMENT_EXCEPTION_TEXT);
  }

  if (amount % 10) {
    throw new Error(NOTE_UNAVAILABLE_EXCEPTION_TEXT);
  }
};

export const calculateNumberOfNotesByValue = (amount: number, note: number) => {
  if (amount < note) {
    return { result: null, rest: amount };
  }

  const numberOfNotes = amount / note;
  const rest = amount % note;

  return { result: Array(Math.floor(numberOfNotes)).fill(note), rest };
};

export const calculateNotes = (amount?: number) => {
  if (!amount) {
    return [];
  }
  validateAmount(amount);

  const result: number[] = [];
  let rest = amount;

  NOTES.forEach((note) => {
    if (rest <= 0) {
      return;
    }

    const {
      result: resultByNote,
      rest: restByNote,
    } = calculateNumberOfNotesByValue(rest, note);

    if (resultByNote) {
      result.push(...resultByNote);
    }

    rest = restByNote;
  });

  return result;
};
