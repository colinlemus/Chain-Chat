var nodemailer = require('nodemailer');

module.exports = (userEmail, subject, html) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: "noreplychainchat@gmail.com",
            clientId: "725763872347-ho0tqurkggl4on5f41b4tmfvjk0kbe7h.apps.googleusercontent.com",
            clientSecret: "Cb3KP1nhAWoLhPLDceXXinpQ",
            refreshToken: "1/NLxUjeIsdZtl4IpeivkuveqoqJZC46YuQ6Gp0O7UrWY0vkIpjokpwvzWK86mMehf",
            accessToken: 'ya29.Gls6BsCZbnB4YLSvhZQjoCH8dg_9Mzl2sA890pe5_C1SDMm1TrcykZBWSpUrGlNrdAxmgCdLMmkoXB-ZM2-P37ssTAkqUQs4yxG3O569VFlObfv1nFwjuTJEaypE'
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