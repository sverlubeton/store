const mailgun = require("mailgun-js");

const DOMAIN = 'sandbox30335a1037174ba49494dade0bdfd1e7.mailgun.org';

const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});
    
const sendEmail =   (email, name) => {
    const data = {
        to: email,
        from: 'malashinkostyai@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}`,
        html: `Welcome`
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
})
}


const resetPassword = (email, token) =>{
    const data = {
        to: email,
        from: 'malashinkostyai@gmail.com',
        subject: 'Восстановление доступа',
        html: `
          <h1>Вы забыли пароль?</h1>
          <p>Если нет, то проигнорируйте данное письмо</p>
          <p>Иначе нажмите на ссылку ниже:</p>
          <p><a href="${process.env.BASE_URL}/auth/password/${token}">Восстановить доступ</a></p>
          <hr />` 
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
})
}

module.exports = {
    sendEmail,
    resetPassword
}