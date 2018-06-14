const express = require('express');
const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

const app = express();
const port = process.env.PORT || 4000;

// Creates a client
const client = new speech.SpeechClient();

const encoding = 'LINEAR16'; //'Encoding of the audio file, e.g. LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US'; //'BCP-47 language code, e.g. en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false, // If you want interim results, set this to true
};

let speechResults;

// Create a recognize stream
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data =>
    speechResults = data.results[0] && data.results[0].alternatives[0]
        ? data.results[0].alternatives[0].transcript
        : `Reached transcription time limit, press Ctrl+C to close\n`
  );

// Start recording and send the microphone input to the Speech API
record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '10.0',
  })
  .on('error', console.error)
  .pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');

app.get('/api/getSpeech', (req, res) => {
    res.send({ express: `${speechResults}` });
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));
