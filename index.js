const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

const app = express();

// app.use(cors());
// app.use(cors({origin: 'http://localhost:3000/'}));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: "gmail",
	secure: false,
	port: 25,
	auth: {
		user: 'd.mehedov2@gmail.com', // generated ethereal user
		pass: 'dZ4qV5tZ' // generated ethereal password
	},tls: {
		rejectUnauthorized: false
	},
});

app.get('/', (req, res) => { //post
	res.send('Hello World! yoo')
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

let port = process.env.PORT || 3010;

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
