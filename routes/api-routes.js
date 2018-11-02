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

    app.post('/api/record/:language/:username', (req, res, next) => {
        const username = req.params.username;
        const languageCode = req.params.language;
        const client = new speech.SpeechClient();
        const encoding = 'LINEAR16';
        const sampleRateHertz = 16000;

        const request = {
            config: {
                encoding,
                sampleRateHertz,
                languageCode,
            },
            interimResults: false,
        };

        const recognizeStream = client
            .streamingRecognize(request)
            .on('error', console.error)
            .on('data', data => {
                io.emit('chat message', `${username} \n ${data.results[0].alternatives[0].transcript}`);

                process.stdout.write(
                    data.results[0] && data.results[0].alternatives[0]
                        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                        : `\n\nReached transcription time limit, press Ctrl+C\n`
                )
            });

        record
            .start({
                sampleRateHertz,
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

    app.post('/api/message/:message/:username', (req, res, next) => {
        const message = req.params.message;
        const username = req.params.username;

        io.emit('chat message', `${username} \n ${message}`);
    });

    app.post('/api/translate/:message/:username/:language', (req, res, next) => {
        const message = req.params.message;
        const language = req.params.language;
        const username = req.params.username;

        translate
            .translate(message, language)
            .then(results => {
                const translation = results[0];

                return res.json({
                    message,
                    translation,
                    username
                });
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    })
};