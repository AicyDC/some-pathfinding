#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int doubler(int x) {
  return 3 * x;
}

bool isInBounds(int x, int y, int gridWidth, int gridHeight) {
	return x >= 0 && y >= 0 && x < gridWidth && y < gridHeight;
}

std::vector<bool> hello;