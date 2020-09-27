#include <emscripten.h>

extern bool fatfart(int x, int y, int gridWidth, int gridHeight) {
	return x >= 0 && y >= 0 && x < gridWidth && y < gridHeight;
}

extern int doubler(int x) {
  return 3 * x;
}
// lol

extern bool isInBounds(int x, int y, int gridWidth, int gridHeight) {
	return x >= 0 && y >= 0 && x < gridWidth && y < gridHeight;
}

extern bool fart(int x, int y, int gridWidth, int gridHeight) {
	return x >= 0 && y >= 0 && x < gridWidth && y < gridHeight;
}

// std::vector<bool> hello;