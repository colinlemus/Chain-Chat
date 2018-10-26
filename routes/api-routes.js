process.env.GOOGLE_APPLICATION_CREDENTIALS = 'config/GoogleAPI STT.json';
const db = require('../models');
const fs = require('fs');
const record = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const { Translate } = require('@google-cloud/translate');
const projectId = 'constant-gecko-219921';
const translate = new Translate({
    projectId,
});

module.exports = app => {
    const io = require('../config/webSockets/socket.js')(app);

    app.post('/api/record', (req, res, next) => {
        const client = new speech.SpeechClient();
        const encoding = 'LINEAR16';
        const sampleRateHertz = 16000;
        const languageCode = 'es'; //replace with the data sent from the request
        let messageOutput;

        const request = {
            config: {
                encoding: encoding,
                sampleRateHertz: sampleRateHertz,
                languageCode: languageCode,
            },
            interimResults: false,
        };

        const convertLanguage = (text, target) => {
            translate
                .translate(text, target)
                .then(results => {
                    const translation = results[0];
                    return translation;
                })
                .catch(err => {
                    console.error('ERROR:', err);
                });
        }

        const recognizeStream = client
            .streamingRecognize(request)
            .on('error', console.error)
            .on('data', data => {
                translate
                    .translate(data.results[0].alternatives[0].transcript, languageCode)
                    .then(results => {
                        const translation = results[0];

                        io.emit('chat message', 
                        `Original message: ${data.results[0].alternatives[0].transcript}
                        \n
                        Translated message: ${translation}`);

                        process.stdout.write(
                            data.results[0] && data.results[0].alternatives[0]
                                ? `Transcription: ${translation}\n`
                                : `\n\nReached transcription time limit, press Ctrl+C\n`
                        )
                    })
                    .catch(err => {
                        console.error('ERROR:', err);
                    });
            });

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
        return res.json();
    })

    // app.post('/api/messageTranslate', (req, res, next) => {
    // this.convertLanguage(req, whateverLanguageTheUserChooses)
    // })
};