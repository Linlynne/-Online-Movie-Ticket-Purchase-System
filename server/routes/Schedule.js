const express = require('express');
const router = express.Router();
const { Schedules, Movies } = require('../models');
const { validateTaken } = require('../middlewares/AuthMiddleware');

router.get('/', validateTaken, async (req, res) => {
    const role = req.user.role;
    if (role === 1) {
        const listOfSchedules = await Movies.findAll({ include: [Schedules] });
        res.json({ listOfSchedules: listOfSchedules });
    } else {
        res.json({ error: 'no right to see the sechudle list' });
    }
});

router.delete('/:scheduleId', validateTaken, async (req, res) => {
    const scheduleId = req.params.scheduleId;
    const role = req.user.role;
    if (role === 1) {
        await Schedules.destroy({
            where: {
                id: scheduleId
            }
        });
        res.json("DELETED SUCCESSFULLY");
    } else {
        res.json({ error: "You don't have right to delete a scheudle" });
    }
});

router.get('/byId/:id', validateTaken, async (req, res) => {
    const role = req.user.role;
    const id = req.params.id;
    if (role === 1) {
        const schedule = await Schedules.findByPk(id);
        res.json(schedule);
    } else {
        res.json({ error: 'access error' });
    }
});

router.put('/showtime', validateTaken ,async (req,res) => {
    const {newShowTime, id} = req.body;
    console.log('newShowTime: ' + newShowTime);
    var result = Date.parse(new Date(newShowTime)) > Date.parse(new Date());
    const role = req.user.role;
    if(role === 1){
        if( result ){
            await Schedules.update({showTime: newShowTime},{where: {id: id}});
            res.json(newShowTime);
        }else{
            res.json(false);
            return;
        }      
    }else{
        res.json({error: "You don't have right to update a movie name"});
    }    
});


router.put('/price', validateTaken, async (req, res) => {
    const { newPrice, id } = req.body;
    const role = req.user.role;
    if (role === 1) {
        if (newPrice !== 0 && newPrice !== null) {
            await Schedules.update({ price: newPrice }, { where: { id: id } });
            res.json(newPrice);
        } else {
            return;
        }
    } else {
        res.json({ error: "You don't have right to update a movie description" });
    }
});

// router.post('/:movieId', validateTaken, async (req,res) => {
//     const MovieId = req.params.movieId;
//     const {RoomId,showTime,price} = req.body;

//     const role = req.user.role;
//     if(role === 1){
//         await Schedules.create({showTime: showTime, price: price, MovieId: MovieId, RoomId: RoomId});
//         res.json('SUCCESS');      //({showTime: showTime, price: price, MovieId: MovieId, RoomId: RoomId});
//     }else{
//         res.json({error: "You don't have right to create a schedule"})
//     }

// });


module.exports = router;