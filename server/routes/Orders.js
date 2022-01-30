const express = require('express');
const router = express.Router();
const { Orders } = require('../models');
const { validateTaken } = require('../middlewares/AuthMiddleware');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async (req,res) => {
    const listOfOrders = await Orders.findAll();
    res.json(listOfOrders);
});

router.get('/byId/:id', validateTaken, async (req,res) => {
    const id = req.params.id;
    const order = await Orders.findByPk(id,
        {
            attributes: [
                'id',
                'orderNumber', 
            [Sequelize.fn('date_format', Sequelize.col('orderDate'), '%Y-%m-%d %H:%i:%s'), 'orderDate'],
            'quantity', 'totalPrice', 'status','ScheduleId','UserId'
            ]
          });
    res.json(order);
});

router.get('/byUserId/:userId', validateTaken, async (req,res) => {
    const userId = req.params.userId;
    const listOfOrders = await Orders.findAll({
        attributes: [
            'id',
            'orderNumber',
            [Sequelize.fn('date_format', Sequelize.col('orderDate'), '%Y-%m-%d %H:%i:%s'), 'orderDate'],
            'quantity', 'totalPrice', 'status','ScheduleId','UserId'
        ],
        where: {
          UserId: userId
        }
      });
    res.json(listOfOrders);
});

router.put('/status',validateTaken, async (req,res) => {
    const status = req.body.status;
    const id = req.body.id;
    Orders.update(
        { status: status,
          updateAt:Sequelize.fn('NOW')
        },
        { where: { id: id } }
    );
    res.json("success");
});

router.post('/', async (req,res) => {
    const orderNumber = req.body.orderNumber;
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;
    const scheduleId = req.body.scheduleId;
    const userId = req.body.userId;

    
    const newOrder = await Orders.create({
        orderNumber:orderNumber,
        orderDate: Sequelize.fn('NOW'),
        quantity: quantity,
        totalPrice: totalPrice,
        ScheduleId:scheduleId,
        UserId:userId
    });
    res.json(newOrder);
    
});

module.exports = router;
