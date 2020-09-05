const nodemailer = require('nodemailer');
const express = require('express')
const bodyParser = require('body-parser');
const {
    response
} = require('express');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/',(req,res)=>{
    res.send({msg:'This has to be used as a third party API. We currently do not have support for the first hand use'});
})
app.route('/send-mail').post((req, res) => {
        const service = req.query.service;
        const fromMail = req.query.email;
        const pwd = req.query.password;
        const other = req.query.other;
        const sub = req.query.sub;
        const body = req.query.body;
        const transporter = nodemailer.createTransport({
            service: service,
            auth: {
                user: fromMail,
                pass: pwd
            }
        })
        const mailOptions = {
            from: fromMail,
            to: other,
            subject: sub,
            text: body
        }
        transporter.sendMail(mailOptions, (err, response) => {
            if (err)
                return res.send({
                    msg: 'Some error Occured,try again'
                })
            res.send({
                msg: `Mail Sent Successfully from ${fromMail} to ${other}`,
                status :'Success',
                report: response
            });
        })
    })

let port = process.env.PORT;
if (port == null || port == "")
    port = 3000
app.listen(port, function () { // Start the server
    console.log("Server Listening to port");
});