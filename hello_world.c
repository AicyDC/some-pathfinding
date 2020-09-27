#include <emscripten.h>
#include <stdbool.h>

EMSCRIPTEN_KEEPALIVE
int doubler(int x) {
  return 3 * x;
}

int isInBounds(int x, int y, int gridWidth, int gridHeight) {
	return x >= 0 && y >= 0 && x < gridWidth && y < gridHeight;
  // if ( x >= 0 && y >= 0 && x < gridWidth && y < gridHeight) {
  //   return 0;
  // } else {
  //   return 1;
  // }
}