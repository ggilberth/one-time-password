const admin = require('firebase-admin')
const twilio = require('./twilio')

const parsePhone = require('../utils/parsePhone')

module.exports = function(req, res) {
    if (!req.body.phone) {
        return res.status(422).send({error: "You must provide a phone number"})
    }

    const phone = parsePhone(req.body.phone)

    admin.auth().getUser(phone).then(userRecord => {
        const code = Math.floor(Math.random() * 8999 + 1000)

        twilio.messages.create({
            body: `Your code is ${code}`,
            to: phone,
            from: '+15866493880'
        }, (err) => {
            if (err) return res.status(422).send(err)

            admin.database().ref(`users/${phone}`)
                .update({code, codeValid: true},() => {
                    res.send({success: true})
                })
        })
    }).catch(err => {
        res.status(422).send({error: err})
    })
}