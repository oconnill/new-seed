var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

var User = require('../models/user')

var Message = require('../models/message');

router.get('/', function (req, res, next) {
    Message.find()
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'Error Alert',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            })

        })
})

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authorized',
                error: err
            });
        }
        next();
    })
});

router.post('/', function (req, res, next) {
    //get user from token
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user
        });
        message.save(function (err, result) {
            if (err) {
                res.status(500).json({
                    title: 'Error',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved Mesage to DB',
                obj: result
            });
        });
    });

});

router.patch('/:id', function (req, res, next) {
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'Error Alert',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message',
                error: { message: 'Message not found' }
            })
        }
        message.content = req.body.content;
        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Saved Mesage to DB',
                obj: result
            })
        })
    })

})

router.delete('/:id', function (req, res, next) {
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'Error Alert',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message',
                error: { message: 'Message not found' }
            })
        }
        message.content = req.body.content;
        message.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error YOOOOO',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Message from DB',
                obj: result
            })
        })
    })
})



module.exports = router;