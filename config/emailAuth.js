var nodemailer = require('nodemailer');

const refreshToken = '1/rmFjwRqyfYTLEKuX-zg-f4wqalflObWsYOek-F8uoHE';
const accessToken = 'ya29.Gls_BhC_lYRRtfZg8eHA75DhMm7mywvqngpLQRPAq8jX2XxVBQ3hQ46Tm6zUxnaPPJFL1Uryd_JMguUwAaXInlDaa-LgZpXN8FPVlY3UD45AcHQdOZmpamrZEL_6'

module.exports = (userEmail, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: "noreplychainchat@gmail.com",
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken,
            accessToken
        }
    });

    const mailOptions = {
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