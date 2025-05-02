const { GifReader } = require("omggif");
const GIFEncoder = require("gif-encoder-2");
const { Jimp } = require("jimp");

async function processGif(overlayBuffer, gifBuffer) {
  const overlay = await Jimp.read(overlayBuffer);

  const reader = new GifReader(gifBuffer);

  const width = overlay.width;
  const height = overlay.height;

  const encoder = new GIFEncoder(width, height, "octree");
  encoder.setDelay(200);
  encoder.start();

  const frameData = new Uint8Array(reader.width * reader.height * 4);

  for (let i = 0; i < reader.numFrames(); i++) {
    reader.decodeAndBlitFrameRGBA(i, frameData);

    let frameImage = await new Jimp({
      data: Buffer.from(frameData),
      width: reader.width,
      height: reader.height,
    });
    frameImage = frameImage.resize({ w: width, h: height });
    frameImage.composite(overlay, 0, 0);

    encoder.addFrame(frameImage.bitmap.data);
  }

  encoder.finish();

  return encoder.out.getData();
}

module.exports = { processGif };
