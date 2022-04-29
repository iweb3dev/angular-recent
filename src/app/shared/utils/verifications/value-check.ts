export function hasValue(value: any): boolean {
  const isNull = value === null;
  const isUndefined = value === undefined;

  return !(isNull || isUndefined);
}

export function nonValue(value: any): boolean {
  return !hasValue(value);
}

export function isEmptyString(value: string): boolean {
  return value === '';
}
