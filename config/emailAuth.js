var nodemailer = require('nodemailer');

var refreshToken = '1/Dne1uko2zdUvlIK68_9yZb_Kzap2W3eVEZmgFTriz2E';
var accessToken = 'ya29.Gls9BuoURNBThAdEsgdGvwMBI6BUotjGSp8Tb4luuf8WitZUlk1nDhKomDiOHaK6x7KSpnR4QeNs0iUBfq1MVS8Ju2MgCdYgPn1xWoz4cYWSnNmGyD_3F-0fKYwj'


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