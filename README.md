# gif-overlay

📦 **gif-overlay** is a Node.js library that overlays a static image (e.g., PNG/JPEG) onto each frame of an animated GIF, using `worker_threads` to handle image processing efficiently in the background.

---

## ✅ Features

- Overlay a static image onto each frame of an animated GIF
- Automatically resizes GIF frames to match the overlay dimensions
- Offloads heavy image processing to a worker thread
- Returns the final result as a new animated GIF

---

## 🛠️ Installation

```bash
npm install gif-overlay
```

---

## 🧪 Usage Example

```js
const fs = require("fs");
const encodeGif = require("./");

const overlay = fs.readFileSync("./overlay.png");
const gif = fs.readFileSync("./input.gif");

encodeGif(overlay, gif).then((gifBuffer) => {
  fs.writeFileSync("output.gif", gifBuffer);
  console.log("GIF saved!");
});

```

---

## 🧠 API

### `encodeGif(overlayBuffer: Buffer, gifBuffer: Buffer): Promise<Buffer>`

- `overlayBuffer`: A buffer of the static image (e.g., PNG, JPG)
- `gifBuffer`: A buffer of the input GIF
- Returns: A `Promise` resolving to a `Buffer` containing the new GIF with the overlay applied

---

## 🧩 Dependencies

- [jimp](https://www.npmjs.com/package/jimp) – image manipulation
- [gif-encoder-2](https://www.npmjs.com/package/gif-encoder-2) – GIF encoding
- [omggif](https://www.npmjs.com/package/omggif) – GIF decoding
- `worker_threads` – built-in Node.js module for multithreading

---

## 💡 Notes

- You can provide the input GIF and overlay image from disk, memory, or network streams.
- The overlay image will be resized to match the GIF frame dimensions automatically.

---

## 📄 License

MIT License

