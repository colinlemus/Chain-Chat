var nodemailer = require('nodemailer');

module.exports = (userEmail, subject, html) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: "noreplychainchat@gmail.com",
            clientId: "725763872347-ho0tqurkggl4on5f41b4tmfvjk0kbe7h.apps.googleusercontent.com",
            clientSecret: "Cb3KP1nhAWoLhPLDceXXinpQ",
            refreshToken: "1/pH0Wimo2ovtLZ1_R6Q2L8mkTH83QwehFOU3ufDvqyxc",
            accessToken: 'ya29.Gls6BgThUvqrYmdEjLs5DRO8WoOKXpU7xdcfg8p_Irz7rhi8ifoRXM2B_Jf8u4pcl2is5pNN7E3ZmC5i8YXZWDciaMGOLdy1yJ6B79Zenvxns9dao8DUAiKg-17B'
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