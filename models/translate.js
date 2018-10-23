process.env.GOOGLE_APPLICATION_CREDENTIALS="C:/Users/imala/Downloads/My Project 90545-ad52715ade28.json";

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');


// Your Google Cloud Platform project ID
const projectId = 'constant-gecko-219921';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});


// The text to translate
// When user on other end hits send in websocket, the text they send 
// will fill in this const. Therefore, this is the text that is coming 
// into the app that is going to be translate.
const text = 'Hello, world!';


// The target language
// This language to display for the user to see on their end.
const target = 'es';

// Translates some text into Russian
translate
  .translate(text, target)
  .then(results => {
    const translation = results[0];

    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

