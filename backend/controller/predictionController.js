const tf = require('@tensorflow/tfjs-node');

const loadModel = async () => {
  return await tf.loadLayersModel("C:/Users/Henry/Desktop/sentiment-face-analysis/model/emotion_model.h5");
};

const preprocessFrame = (frameData) => {
  // Assuming frameData is a flat array of pixel values (0-255)
  const width = 48; // Adjust based on your model's input shape
  const height = 48;

  // Reshape the flat array into a 3D tensor (height, width, channels)
  const tensor = tf.tensor3d(frameData, [height, width, 1], 'int32');

  // Normalize pixel values to the range [0, 1]
  const normalizedTensor = tensor.div(255.0);

  // Expand dimensions to match the input shape expected by the model
  const expandedTensor = normalizedTensor.expandDims(0);

  return expandedTensor;
};


const makePredictions = (model, preprocessedFrame) => {
  return model.predict(preprocessedFrame);
};

const processPredictions = (predictions) => {
  // Assuming predictions is a tensor containing probabilities for each class
  const probabilities = predictions.dataSync(); // Convert tensor to array

  // Map the index to your sentiment classes
  const sentimentClasses = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'];

  // Find the index of the class with the highest probability
  const maxProbabilityIndex = probabilities.indexOf(Math.max(...probabilities));

  // Get the corresponding sentiment class
  const predictedSentiment = sentimentClasses[maxProbabilityIndex];

  return predictedSentiment;
};


module.exports = { loadModel, preprocessFrame, makePredictions, processPredictions };
