const admin = require('firebase-admin')

module.exports = function(req, res) {
    // verify number
    if (!req.body.phone) {
        return res.status(422).send({error: "Bad input"});
    }

    // format number
    const phone = String(req.body.phone).replace(/[^\d]/g, "");

    // create user
    admin.auth().createUser({uid: phone})
        .then(user => res.send(user))
        .catch(err => res.status(422).send({error: err}))

}