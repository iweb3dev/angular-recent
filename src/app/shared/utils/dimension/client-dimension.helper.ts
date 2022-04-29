export function clientHeight(): number {
  return window.innerHeight !== undefined
    ? window.innerHeight
    : document.documentElement.clientHeight;
}

export function clientWidth(): number {
  return window.innerWidth !== undefined
    ? window.innerWidth
    : document.documentElement.clientWidth;
}
