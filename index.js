const { Worker } = require("worker_threads");
const path = require("path");

module.exports = function (overlayBuffer, gifBuffer) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, "worker.js"), {
      workerData: {
        overlay: overlayBuffer.buffer.slice(
          overlayBuffer.byteOffset,
          overlayBuffer.byteOffset + overlayBuffer.byteLength
        ),
        gif: gifBuffer.buffer.slice(
          gifBuffer.byteOffset,
          gifBuffer.byteOffset + gifBuffer.byteLength
        ),
      },
      transferList: [overlayBuffer.buffer, gifBuffer.buffer],
    });

    worker.on("message", (data) => {
      if (data && data.error) {
        reject(new Error(data.error));
      } else {
        const result = Buffer.isBuffer(data) ? data : Buffer.from(data);
        resolve(result);
      }
    });

    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with code ${code}`));
    });
  });
};
