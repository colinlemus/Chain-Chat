var nodemailer = require('nodemailer');

var refreshToken = '1/YzahkO2sMKmLR6iSK3FDvFxcLXP4mOvYq_TLbAeYlTakjkNhl8Xk_qN3X1fBFJkC';
var accessToken = 'ya29.Gls7BlIIsZ2sSDliJYHF-EV1_gNWLJ-VSY41P0fpHscJOxnLrjQ8vqjZQY73XkoVPQOTFh010RIwM_nIixrQeTePWXY3t-Ae1BmMMfmFSATnFkeweweUGvISRGJR'


module.exports = (userEmail, subject, html) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: "noreplychainchat@gmail.com",
            clientId: "725763872347-ho0tqurkggl4on5f41b4tmfvjk0kbe7h.apps.googleusercontent.com",
            clientSecret: "Cb3KP1nhAWoLhPLDceXXinpQ",
            refreshToken,
            accessToken
        }
    });

    var mailOptions = {
        from: 'noreplychainchat@gmail.com',
        to: userEmail,
        subject,
        text: '',
        html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}