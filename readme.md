wasm.js added with template from:
https://www.youtube.com/watch?v=JqCaynNwtOA

then to index.html we add:
<script src="wasm.js"></script>

then we also add code.c

# run the following command to get the .wasm file:
emcc code.c -s WASM=1 -o code.html
# remove the html and js files