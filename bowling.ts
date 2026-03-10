// sum an individual player's rolls and return their score for each frame
// input is an array of rolls with possible values of zero through nine, a '/' for a spare, and an 'X' for a strike
// return value is an array of scores for the frames the player has bowled

const STRIKE_BASE_VALUE: number = 10;
const SPARE_BASE_VALUE: number = 10;

// helpers
export function isNumericFrame(frame: (number | "/" | "X")[]): boolean {
  return frame.length === 2 && frame.every((roll) => typeof roll === "number");
}

export function isSpareFrame(frame: (number | "/" | "X")[]): boolean {
  return frame.length === 2 && typeof frame[0] === "number" && frame[1] === "/";
}

export function isStrikeFrame(frame: (number | "/" | "X")[]): boolean {
  return frame.length === 1 && frame[0] === "X";
}

export function isPartialNumericFrame(frame: (number | "/" | "X")[]): boolean {
  return frame.length === 1 && typeof frame[0] === "number";
}

export function isPartialSpareFrame(frame: (number | "/" | "X")[]): boolean {
  return frame.length === 1 && frame[0] === "/";
}

export function getNextFrameFromRolls(
  rolls: (number | "/" | "X")[],
  startIndex: number,
): (number | "/" | "X")[] | null {
  if (startIndex >= rolls.length) {
    return null;
  }
  const frame: (number | "/" | "X")[] = [];
  for (let i = startIndex; i < rolls.length; i++) {
    frame.push(rolls[i]);
    if (isNumericFrame(frame) || isSpareFrame(frame) || isStrikeFrame(frame)) {
      return frame;
    }
  }
  return null;
}

export function getAllFrames(
  rolls: (number | "/" | "X")[],
): (number | "/" | "X")[][] {
  const frames: (number | "/" | "X")[][] = [];
  let index = 0;
  while (index < rolls.length) {
    const frame = getNextFrameFromRolls(rolls, index);
    if (frame) {
      frames.push(frame);
      index += frame.length;
    } else {
      // lets see if there are any remaining rolls
      const remainingRolls = rolls.slice(index);
      if (
        isPartialNumericFrame(remainingRolls) ||
        isPartialSpareFrame(remainingRolls)
      ) {
        frames.push(remainingRolls);
        // we dont need to increment index anymore, this is the last frame
      }
      break;
    }
  }
  return frames;
}

// calculate the score for a bowling game based on the rolls
// inputs: an array of rolls with possible values of zero through nine, a '/' for a spare, and an 'X' for a strike
// outputs: an array of scores for the frames the player has bowled, with null for frames that cannot yet be scored
export function scoreGame(rolls: (number | "/" | "X")[]): (number | null)[] {
  const frames = getAllFrames(rolls);
  const scores: (number | null)[] = [];

  for (let i = 0; i < frames.length; i++) {
    if (scores.length === 10) break;
    // calculate the score for each frame
    if (isNumericFrame(frames[i])) {
      // sum the two rolls
      scores.push((frames[i][0] as number) + (frames[i][1] as number));
    } else if (isSpareFrame(frames[i])) {
      // sum the two rolls and add the next roll
      if (i + 1 < frames.length) {
        const nextFrame = frames[i + 1];
        if (isNumericFrame(nextFrame) || isPartialNumericFrame(nextFrame)) {
          scores.push(SPARE_BASE_VALUE + (nextFrame[0] as number));
        } else if (isStrikeFrame(nextFrame)) {
          scores.push(SPARE_BASE_VALUE + STRIKE_BASE_VALUE);
        } else {
          scores.push(null);
        }
      } else {
        scores.push(null);
      }
    } else if (isStrikeFrame(frames[i])) {
      if (i + 1 < frames.length) {
        const nextFrame = frames[i + 1];
        if (isNumericFrame(nextFrame)) {
          scores.push(
            STRIKE_BASE_VALUE +
              (nextFrame[0] as number) +
              (nextFrame[1] as number),
          );
        } else if (isStrikeFrame(nextFrame)) {
          if (i + 2 < frames.length) {
            const frameAfterNext = frames[i + 2];
            if (isNumericFrame(frameAfterNext)) {
              scores.push(
                STRIKE_BASE_VALUE +
                  STRIKE_BASE_VALUE +
                  (frameAfterNext[0] as number),
              );
            } else if (isStrikeFrame(frameAfterNext)) {
              scores.push(
                STRIKE_BASE_VALUE + STRIKE_BASE_VALUE + STRIKE_BASE_VALUE,
              );
            } else if (isSpareFrame(frameAfterNext)) {
              // Two strikes followed by a spare frame still yields 10 pins for the third bonus roll.
              scores.push(
                STRIKE_BASE_VALUE + STRIKE_BASE_VALUE + SPARE_BASE_VALUE,
              );
            } else {
              scores.push(null);
            }
          } else {
            scores.push(null);
          }
        } else if (isSpareFrame(nextFrame)) {
          if (i + 2 < frames.length) {
            const frameAfterNext = frames[i + 2];
            if (
              isNumericFrame(frameAfterNext) ||
              isPartialNumericFrame(frameAfterNext)
            ) {
              scores.push(
                STRIKE_BASE_VALUE +
                  (nextFrame[0] as number) +
                  (frameAfterNext[0] as number),
              );
            } else if (isStrikeFrame(frameAfterNext)) {
              scores.push(
                STRIKE_BASE_VALUE +
                  (nextFrame[0] as number) +
                  STRIKE_BASE_VALUE,
              );
            } else {
              scores.push(null);
            }
          } else if (i === 9) {
            // In the 10th frame, X then spare (e.g., X 7 /) is fully scorable as 20 without an extra frame object.
            scores.push(STRIKE_BASE_VALUE + SPARE_BASE_VALUE);
          } else {
            scores.push(null);
          }
        } else {
          scores.push(null);
        }
      } else {
        scores.push(null);
      }
    } else if (isPartialNumericFrame(frames[i])) {
      scores.push(null);
    } else if (isPartialSpareFrame(frames[i])) {
      scores.push(null);
    }
  }
  return scores;
}
