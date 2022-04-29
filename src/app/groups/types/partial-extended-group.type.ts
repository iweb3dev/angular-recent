export type PartialExtendedGroup<T> = {
  [P in keyof T]?: PartialExtendedGroup<T[P]>;
};
