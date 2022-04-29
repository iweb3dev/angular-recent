/** Finds object fields that are different
 * @original Object to compare with
 * @target Fields values that result should return
 * @ignore Target fields names to ignore
 * @returns Only different fields
 */

export function objectDelta<TTarget, TOriginal = TTarget>(
  target: TTarget,
  original: TOriginal,
  ignore: Array<keyof TTarget> = [],
): Partial<TTarget> {
  const result: Partial<TTarget> = {};

  for (const key of deltaFields(target, original, ignore)) {
    result[key] = target[key];
  }

  return Object.values(result).length ? result : null;
}

function* deltaFields<TTarget, TOriginal = TTarget>(
  target: TTarget,
  original: TOriginal,
  ignore: Array<keyof TTarget>,
): Iterable<string> {
  for (const [key, value] of Object.entries(target)) {
    if (original[key] !== value && !ignore.includes(key as keyof TTarget)) {
      yield key;
    }
  }
}
