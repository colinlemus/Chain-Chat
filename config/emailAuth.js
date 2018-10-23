var nodemailer = require('nodemailer');

var refreshToken = '1/rmFjwRqyfYTLEKuX-zg-f4wqalflObWsYOek-F8uoHE';
var accessToken = 'ya29.Gls_BhC_lYRRtfZg8eHA75DhMm7mywvqngpLQRPAq8jX2XxVBQ3hQ46Tm6zUxnaPPJFL1Uryd_JMguUwAaXInlDaa-LgZpXN8FPVlY3UD45AcHQdOZmpamrZEL_6'


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