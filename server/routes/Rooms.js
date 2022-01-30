const express = require('express');
const router = express.Router();
const { Rooms } = require('../models');
const { validateTaken } = require('../middlewares/AuthMiddleware');


router.post('/', validateTaken, async (req,res) => {
    const room = req.body;
    const role = req.user.role;
    if(role === 1){
        await Rooms.create(room);
        res.json(room);
    }else{
        res.json({error: "You don't have right to create a room"})
    }
    
});

router.get('/', async (req,res) => {
    const listOfRooms = await Rooms.findAll();
    res.json(listOfRooms);
});

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id;
    const room = await Rooms.findByPk(id);
    res.json(room);
});


module.exports = router;