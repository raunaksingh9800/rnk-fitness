const express = require('express');

var cors = require("cors");


const app = express();
app.use(cors());
app.get('/' , (req, res)=>{
	res.status(404).json({message: "error"});

})

const emailAuth = require('./routes/email')
const OTPAuth = require('./routes/otpcheck')
app.use('/api', emailAuth)
app.use('/api', OTPAuth)

const { OTPs } = require('./routes/OTPdata.js');




function clean(){
	console.log(OTPs)
    OTPs.splice(0, OTPs.length);
    setTimeout(clean, 2000000);
    console.log(OTPs)
}

clean();

app.listen(3030)