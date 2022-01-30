const express = require('express');
const router = express.Router();
const { Movies, Schedules } = require('../models');
const { validateTaken } = require('../middlewares/AuthMiddleware');


router.get('/', async (req,res) => {
    const listOfMovies = await Movies.findAll();
    res.json(listOfMovies);
});

router.post('/', validateTaken, async (req,res) => {
    const movie = req.body;
    const role = req.user.role;
    if(role === 1){
        await Movies.create(movie);
        res.json(movie);
    }else{
        res.json({error: "You don't have right to create a movie"})
    }
    
});

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id;
    const movie = await Movies.findByPk(id);
    res.json(movie);
});

router.delete('/:movieId',validateTaken,async (req,res) => {
    const movieId = req.params.movieId;
    const role = req.user.role;
    if(role === 1 ){
        await Movies.destroy({where: {
            id: movieId
        }});
        res.json("DELETED SUCCESSFULLY");
    }else{
        res.json({error: "You don't have right to delete a movie"});
    }       
});

router.put('/movieName', validateTaken ,async (req,res) => {
    const {newMoviename, id} = req.body;
    const role = req.user.role;
    if(role === 1){
        if(newMoviename.length !== 0){
            await Movies.update({movieName: newMoviename},{where: {id: id}});
            res.json(newMoviename);
        }else{
            return;
        }      
    }else{
        res.json({error: "You don't have right to update a movie name"});
    }    
});

router.put('/description', validateTaken ,async (req,res) => {
    const {newDescription, id} = req.body;
    const role = req.user.role;
    if(role === 1){
        if(newDescription.length !== 0){
            await Movies.update({description: newDescription},{where: {id: id}});
            res.json(newDescription);
        }else{
            return;
        }      
    }else{
        res.json({error: "You don't have right to update a movie description"});
    }   
});


router.post('/:movieId', validateTaken, async (req,res) => {
    const MovieId = req.params.movieId;
    const {RoomId,showTime,price} = req.body;
    // Date.parse(showTime).setHours(Date.parse(showTime).getHours() - 5);
 
    const role = req.user.role;
    if(role === 1){
        await Schedules.create({showTime: showTime, price: price, MovieId: MovieId, RoomId: RoomId});
        res.json('SUCCESS');      //({showTime: showTime, price: price, MovieId: MovieId, RoomId: RoomId});
    }else{
        res.json({error: "You don't have right to create a schedule"})
    }
    
});



module.exports = router;
