import { describe, it, expect } from "vitest";
import { scoreGame } from "./bowling";

// base test
describe("scoreGame", () => {
  it("should return the correct frame scores for a given set of rolls", () => {
    const testRolls: (number | "/" | "X")[] = [4, 5, "X", 8];
    const correctResults: (number | null)[] = [9, null, null];
    expect(scoreGame(testRolls)).toEqual(correctResults);
  });
});

// additional tests
describe("scoreGame edge cases", () => {
  // empty rolls
  it("should return an empty array for no rolls", () => {
    expect(scoreGame([])).toEqual([]);
  });

  // incomplete strike
  it("should return null for a strike with no next rolls", () => {
    expect(scoreGame(["X"])).toEqual([null]);
  });

  // incomplete spare
  it("should return null for a spare with no next rolls", () => {
    expect(scoreGame([5, "/"])).toEqual([null]);
  });

  // incomplete strike
  it("should return null, null for a strike followed by a single roll", () => {
    expect(scoreGame(["X", 5])).toEqual([null, null]);
  });

  // perfect game
  it("should return the correct frame scores for a perfect game", () => {
    const testRolls: (number | "/" | "X")[] = [
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
    ];
    const correctResults: (number | null)[] = [
      30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
    ];
    expect(scoreGame(testRolls)).toEqual(correctResults);
  });

  // complex game
  it("should return the correct frame scores for a complex game", () => {
    const testRolls: (number | "/" | "X")[] = [
      5,
      "/",
      7,
      2,
      "X",
      9,
      "/",
      "X",
      "X",
      8,
      1,
      6,
      "/",
      7,
      2,
      "X",
      9,
      0,
    ];
    const correctResults: (number | null)[] = [
      17, 9, 29, 20, 28, 19, 9, 17, 9, 19,
    ];
    expect(scoreGame(testRolls)).toEqual(correctResults);
  });

  // end on a spare
  it("should return the correct frame scores when the last frame is a spare", () => {
    const testRolls: (number | "/" | "X")[] = ["X", 3, 6, "/"];
    const correctResults: (number | null)[] = [19, 9, null];
    expect(scoreGame(testRolls)).toEqual(correctResults);
  });

  // spare followed by a strike
  it("should return the correct frame scores when a spare is followed by a strike", () => {
    const testRolls: (number | "/" | "X")[] = [5, "/", "X"];
    const correctResults: (number | null)[] = [20, null];
    expect(scoreGame(testRolls)).toEqual(correctResults);
  });

  // strike followed by a spare
  it("should return the correct frame scores when a strike is followed by a spare", () => {
    const testRolls: (number | "/" | "X")[] = ["X", 7, "/"];
    const correctResults: (number | null)[] = [null, null];
    expect(scoreGame(testRolls)).toEqual(correctResults);
  });

  // two strikes then finished frame
  it("should return the correct frame scores when two strikes are followed by an open frame", () => {
    const testRolls: (number | "/" | "X")[] = ["X", "X", 5, 3];
    const correctResults: (number | null)[] = [25, 18, 8];
    expect(scoreGame(testRolls)).toEqual(correctResults);
  });

  // spare but missing the next roll
  it("should return the correct frame scores when a spare is missing the next roll", () => {
    const testRolls: (number | "/" | "X")[] = [5, 5, 5, 5, 5, 5, "/"];
    const correctResults: (number | null)[] = [10, 10, 10, null];
    expect(scoreGame(testRolls)).toEqual(correctResults);
  });

  // incomplete spare in the 10th frame
  it("10th‑frame spare", () => {
    const testRolls: (number | "/" | "X")[] = [
      5,
      "/",
      7,
      2,
      "X",
      9,
      "/",
      "X",
      "X",
      8,
      1,
      6,
      "/",
      7,
      2,
      "X",
      "/",
      5,
    ];
    const correctResults: (number | null)[] = [
      17,
      9,
      29,
      20,
      28,
      19,
      9,
      17,
      9,
      null,
    ];
    expect(scoreGame(testRolls)).toEqual(correctResults);
  });

  // nearly perfect game...
  it("10th frame: X 9 /", () => {
    const testRolls: (number | "/" | "X")[] = [
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
      "X",
      9,
      "/",
    ];
    const expected = [30, 30, 30, 30, 30, 30, 30, 30, 30, 20];
    expect(scoreGame(testRolls)).toEqual(expected);
  });
});
