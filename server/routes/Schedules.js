const express = require('express');
const router = express.Router();
const { Schedules, Movies } = require('../models');
const { validateTaken } = require('../middlewares/AuthMiddleware');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async (req,res) => {
    const listOfSchedules = await Schedules.findAll();
    res.json(listOfSchedules);
});

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id;
    const schedule = await Schedules.findByPk(id,{
        attributes: [
            'id',
            [Sequelize.fn('date_format', Sequelize.col('showTime'), '%Y-%m-%d %H:%i:%s'), 'showTime'],
            'price', 'occupiedSeats', 'MovieId','RoomId'
        ]
      });
    res.json(schedule);
});

router.get('/byMovieId/:movieId', async (req,res) => {
    const movieId = req.params.movieId;
    const movie = await Schedules.findAll({
        attributes: [
            'id',
            [Sequelize.fn('date_format', Sequelize.col('showTime'), '%Y-%m-%d %H:%i:%s'), 'showTime'],
            'price', 'occupiedSeats', 'MovieId','RoomId'
        ],
        where: {
            movieId:movieId
        }
    });
    res.json(movie);
});

router.put('/seats', async (req,res) => {
    const id = req.body.id;
    const seats = req.body.seats;
    Schedules.update(
        { occupiedSeats: Sequelize.fn('CONCAT', Sequelize.col("occupiedSeats"),','+seats),
          updateAt:Sequelize.fn('NOW')
        },
        { where: { id: id } }
    );
    res.json("success");
});

module.exports = router;
