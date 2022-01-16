const express = require('express');
const User = require('../database/schema/usersSchema');
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')

const router = express.Router();

router.get('/signup',

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            });
        }
        const email = req.query.email
        const password = req.query.password

        try {
            // let user = User.findOne({ email })
            // console.log(user);
            // if (user) {
            //     res.status(400).send({
            //         message: "User already exist"
            //     })
            // }
            console.log(password);
            console.log(email);
            user = new User({
                email: email,
                password: password
            })
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, "randomString", {
                expiresIn: 10000
            }), (err, token) => {
                if (err) {
                    throw err
                }
                res.status(200).json({
                    token: token,
                    message: "Success"
                });
            }
        } catch (error) {
            res.status(400).json({
                error: "Something went Wrong"
            })
        }

    })


router.get('/login', async (req, res) => {
    const email = req.query.email
    const password = req.query.password

    try {
        let user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(400).json({
                message: "User not Exist"
            })
        }
        console.log(password);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            res.status(400).json({
                message: "Wrong Password!"
            })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, "randomString", {
            expiresIn: 3600
        },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token, message: "Success" })
            }

        )
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }

})

module.exports = router;