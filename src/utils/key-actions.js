export function moveLeft(p) {
  p.x = p.x - 1;
  p.y = p.y;
  return p;
}

export function moveRight(p) {
  p.x = p.x + 1;
  p.y = p.y;
  return p;
}

export function moveUp(p) {
  p.x = p.x;
  p.y = p.y - 1;
  return p;
}

export function moveDown(p) {
  p.x = p.x;
  p.y = p.y + 1;
  return p;
}

export function Enter() {
  var current = document.getElementsByClassName('focus')[0];
  if (current) {
    return current.click();
  }
}