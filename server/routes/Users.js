const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { validateTaken } = require('../middlewares/AuthMiddleware');
const { sign } = require('jsonwebtoken');
const Sequelize = require('sequelize');


router.post('/', async (req, res) => {
    const { email, firstName, lastName, phone, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            password: hash
        });
        res.json("SUCCESS");
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
        res.json({ error: "User doesn't exist" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "wrong username and password" });
            } else {
                const accessToken = sign({ email: email, id: user.id, role: user.role, firstName: user.firstName ,lastName:user.lastName}, "importantsecret");
                res.json({ token: accessToken, email: email, id: user.id, role: user.role, firstName: user.firstName,lastName: user.lastName});
            }
        });
    }
});

router.put('/update', validateTaken, async (req, res) => {
    const { id, email, firstName, lastName, oldPassword,newPassword} = req.body;
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
        res.json({ error: "User doesn't exist" });
    } else {
        bcrypt.compare(oldPassword, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Old Password doesn't match" });
            } else {
                Users.update(
                    { firstName: firstName,
                      lastName: lastName,
                      updateAt:Sequelize.fn('NOW')
                    },
                    { omitNull: true,
                        where: { id: id } 
                    }
                );
                if(newPassword){
                    bcrypt.hash(newPassword, 10).then((hash) => {
                        Users.update(
                            { password: hash,
                              updateAt:Sequelize.fn('NOW')
                            },
                            {
                                where: { id: id } 
                            }
                        );
                    });
                }
                res.json({result:"success"});
            }
        });
    }
});

router.get('/check', validateTaken, (req, res) => {
    res.json(req.user);
});

router.get('/account', validateTaken, async (req, res) => {
    const role = req.user.role;
    if (role === 1) {
        const listOfUsers = await Users.findAll();
        res.json(listOfUsers);
    } else {
        res.json({ error: 'You are no right to see user' });
    }
});

router.get('/byId/:id', validateTaken, async (req, res) => {
    const role = req.user.role;
    const id = req.params.id;
    if (role === 1) {
        const user = await Users.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        res.json(user);
    } else {
        res.json({ error: 'access error' });
    }
});

router.put('/email', validateTaken, async (req, res) => {
    const { newEmail, id } = req.body;
    const role = req.user.role;
    if (role === 1) {
       if(newEmail.length !== 0 && newEmail !== null){
        await Users.update({ email: newEmail }, { where: { id: id } });
        res.json(newEmail);
       }else{
           return;
       }    
    } else {
        res.json({ error: "You don't have right to update a client email" });
    }
});

router.put('/phone', validateTaken, async (req, res) => {
    const { newPhone, id } = req.body;
    const role = req.user.role;
    if (role === 1) {
        if(newPhone.length !== 0){
            await Users.update({ phone: newPhone }, { where: { id: id } });
            res.json(newPhone);
        }else{
            return;
        }          
    } else {
        res.json({ error: "You don't have right to update a client phone" });
    }
});


// router.get('/basicinfo/:id', async (req, res) => {
//     const id = req.params.id;
//     const basicInfo = await Users.findByPk(id, {
//         attributes: { exclude: ['password'] }
//     });
//     res.json(basicInfo);
// });


module.exports = router;