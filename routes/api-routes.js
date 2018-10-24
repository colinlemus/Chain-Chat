const db = require('../models');
const fs = require('fs');
const record = require('node-record-lpcm16');
process.env.GOOGLE_APPLICATION_CREDENTIALS="/Users/steveszumski/Desktop/code/JSONKeys/UCLA Bootcamp Project 3-3ebb983f55a2.json"
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

translateInput = (textInput, language) => {
    // translate the textInput into whatever language
}

module.exports = app => {


    app.post('/api/record', (req, res, next) =>  {
        console.log("Recording API")
        // speechToText = () => {
    // Creates a client
    const client = new speech.SpeechClient();
    const encoding = 'LINEAR16';
    const sampleRateHertz = 16000;
    const languageCode = 'en-US';
    let messageOutput;

    const request = {
        config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
        },
        interimResults: false, // If you want interim results, set this to true
    };

    // Create a recognize stream
    const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data =>
    process.stdout.write(
        data.results[0] && data.results[0].alternatives[0]
        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        : `\n\nReached transcription time limit, press Ctrl+C\n`
        
        
    )
    
    );
    

    // Start recording and send the microphone input to the Speech API
    record
    .start({
        sampleRateHertz: sampleRateHertz,
        threshold: 0,
        
        verbose: false,
        recordProgram: 'rec', // Try also "arecord" or "sox"
        silence: '10.0',
    })
    .on('error', console.error)
    .pipe(recognizeStream);

    console.log('Listening, press Ctrl+C to stop.');
    // send captured speech to translate service here
    // this.translateInput(theCaputuredInput, whateverLanguageTheUserChooses)
        return res.json();
    }) 

    // app.post('/api/messageTranslate', (req, res, next) => {
        // this.translateInput(req, whateverLanguageTheUserChooses)
    // })

};