const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const { OTPs } = require('./OTPdata.js')

var sendEmailAdd;

var OTP

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'fitness.rnk@gmail.com',
		pass: 'raunaksingh@69'
	}
});


transporter.use('compile', hbs({
	viewEngine: 'express-handlebars',
	viewPath: './views/'
}));


var messageAPI = {
	sentStatus: false,
}

router.get("/emailAuth/:emailAdd", (req, res) => {
	sendEmailAdd = req.params.emailAdd;
	//////////////////////////////////////////////////////////////////////////
	async function sendOT() {
		OTP = Math.floor(1000 + Math.random() * 9000);
		console.log(OTP);
		var mailOptions = {
			from: 'fitness.rnk@gmail.com',
			to: sendEmailAdd,
			subject: 'OTP from Fitness App',
			text: `Your OTP is ${OTP}`,
			template: 'index',
			context: {
				otp: OTP,
			}
		}
		await transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			}
			else {
				OTPs.push(sendEmailAdd, OTP)
				console.log('sent'+info.response);
				messageAPI.sentStatus = true
				res.send(messageAPI)
			}

		})

	}
	///////////////////////////////////////////////////////////////////////////
	sendOT();
})




module.exports = router