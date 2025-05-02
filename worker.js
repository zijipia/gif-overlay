const { parentPort, workerData } = require("worker_threads");
const { processGif } = require("./gifProcessor");

(async () => {
  try {
    const overlayBuffer = Buffer.from(workerData.overlay);
    const gifBuffer = Buffer.from(workerData.gif);

    const result = await processGif(overlayBuffer, gifBuffer);
    parentPort.postMessage(new Uint8Array(result));
  } catch (err) {
    parentPort.postMessage({ error: err.message });
  }
})();
