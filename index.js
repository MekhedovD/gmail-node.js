const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3010;
const SMPT_LOGIN = process.env.SMTP_LOGIN || '---'
const SMPT_PASSWORD = process.env.SMTP_PASSWORD || '---'

var corsOptions = {
	origin: ['http://localhost:3000'],
	credentials: true,
	methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'] };
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: 'login',
		user: SMPT_LOGIN, // generated ethereal user
		pass: SMPT_PASSWORD // generated ethereal password
	}
});



app.get('/', (req, res) => { //post
	res.send('Hello World! YOO')
})

app.post('/sendMessage', async function (req, res) {

	let {name, email, message} = req.body

	let info = await transporter.sendMail({
		from: 'HR', // sender address
		to: "mekhedov.d@mail.ru", // list of receivers
		subject: "Testing GMAIL", // Subject line
		// text: "Hello world?", // plain text body
		html: `<b>Сообщение с Вашего портфолио</b>
			<div><b>name:</b> ${name}</div>
    	<div><b>email:</b> ${email}</div>
      <div>${message}</div>`, // html body`
	});

	// res.send(res.body)
	res.send('send message mail')
})

// let port = process.env.PORT || 3010;

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
