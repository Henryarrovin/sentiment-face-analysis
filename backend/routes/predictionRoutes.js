const express = require('express');
const bodyParser = require('body-parser');
const predictionController = require('../controller/predictionController');

const router = express.Router();
router.use(bodyParser.json());

router.post('/predict', async (req, res) => {
  try {
    const { body: videoFrameData } = req;

    // Load the model
    const model = await predictionController.loadModel();

    // Preprocess the video frame
    const preprocessedFrame = predictionController.preprocessFrame(videoFrameData);

    // Make predictions
    const predictions = predictionController.makePredictions(model, preprocessedFrame);

    // Process predictions and send response
    const sentimentResult = predictionController.processPredictions(predictions);
    res.json({ sentiment: sentimentResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
