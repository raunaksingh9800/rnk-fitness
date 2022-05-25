const express = require('express')
const router = express.Router();
const { OTPs } = require('./OTPdata.js');

var resOTP = 0;

var resEmail="";

var flag = false;

var indexOfLocation=0;

router.get('/OTPAuth/:otp/:reqEmail', (req, res) => {
	resOTP = req.params.otp;
	resEmail = req.params.reqEmail;
	console.log(OTPs.length);
	searchForOTP();
	OTPcheck(res);

})

function searchForOTP() {
	for(var i =0;i<OTPs.length;i++){
		if(OTPs[i]==resEmail){
			flag = true;
			indexOfLocation = i;
		}
		else{
			flag = false;
		}
	}
}


function OTPcheck(res){
	var dataOTP = OTPs[(indexOfLocation+1)];
	if(dataOTP==resOTP){
		res.json({ OTP: true })
		console.log("correct")
		OTPs.splice(indexOfLocation, (indexOfLocation+1));
	}
	else{
		console.log("Incorrect")
		res.json({ OTP: false })
	}
}

module.exports = router