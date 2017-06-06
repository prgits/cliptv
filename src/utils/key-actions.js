export function moveLeft(p, min) {
  p.x = (p.x - 1 >= min) ? (p.x - 1) : min;
  p.y = p.y;
  return p;
}

export function moveRight(p, max) {
  p.x = (p.x + 1 <= max) ? (p.x + 1) : max;
  p.y = p.y;
  return p;
}

export function Enter() {
  var current = document.getElementsByClassName('focus')[0];
  if (current) {
    return current.click();
  }
}