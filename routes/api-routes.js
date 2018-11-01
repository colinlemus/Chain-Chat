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
        const selectedLanguage = req.params.language;
        const username = req.params.username;
        const client = new speech.SpeechClient();
        const encoding = 'LINEAR16';
        const sampleRateHertz = 16000;
        const languageCode = 'en-US';
        let messageOutput;

        console.log('SELECTEDLANGUAGE VALUE', selectedLanguage);
        console.log('username', username);

        const request = {
            config: {
                encoding,
                sampleRateHertz,
                languageCode,
            },
            interimResults: false,
        };

        console.log('deploy test 1');

        const recognizeStream = client
            .streamingRecognize(request)
            .on('error', console.error)
            .on('data', data => {
                console.log('deploy test 2');
                translate
                    .translate(data.results[0].alternatives[0].transcript, selectedLanguage)
                    .then(results => {
                        const translation = results[0];

                        io.emit('chat message',
                            `Original message: ${username}: ${data.results[0].alternatives[0].transcript}
                        \n
                        Translated message: ${username}: ${translation}`);

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
                sampleRateHertz,
                threshold: 0,

                verbose: true,
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
        translate
            .translate(message, 'es')
            .then(results => {
                const translation = results[0];

                io.emit('chat message',
                    `${username}: Original message: ${message}
                        \n
                        ${username}: Translated message: ${translation}`);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    })
};