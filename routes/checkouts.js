const express = require('express');
const router = express.Router();

const { Products } = require("../models");
const { Checkouts } = require("../models");
const { Purchases } = require("../models");
const validator = require("fastest-validator");
const v = new validator();
const verify = require('../middleware/verify');
const sequelize = require('sequelize');
const { checkout } = require('./carts');

Checkouts.hasMany(Purchases);
Purchases.belongsTo(Checkouts);

router.get("/", async function(req , res, next){
    
    try{
        let checkouts = await Checkouts.findAll();        

        return res.json({
            status: 200,
            message: "Success Show Checkouts",
            data: checkouts
        })
    }
    catch (error) {
        return res.status(404).json({
          status: 404,
          message: `Terjadi Error : ${error}`,
        });
      }
    
});

router.get("/parentdetail", async function(req , res, next){
    try{
        let checkouts = await Checkouts.findAll({
            include: [{
                model: Purchases
            }]
        });

        return res.json({
            status: 200,
            message: "Success Show ParentDetail",
            data: checkouts
        })
    }
    catch (error) {
        return res.status(404).json({
          status: 404,
          message: `Terjadi Error : ${error}`,
        });
      }
    
});


router.post("/create", async function(req , res, next){
    let date = new Date();
    let orderCode = 'ORDER-'+date.getFullYear().toString() + 
                    pad2(date.getMonth() + 1) + 
                    pad2( date.getDate()) + 
                    pad2( date.getHours() ) + 
                    pad2( date.getMinutes() ) + 
                    pad2( date.getSeconds() );
   
    req.body.code = orderCode;
    
    console.log('req.body',req.body);
    const schema = {
        firstName: { type: "string", empty:false },
        lastName: { type: "string", empty:false },
        address1: { type: "string", empty:false },
        country: { type: "string", empty:false },
        city: { type: "string", empty:false },
        zip: { type: "string", empty:false },
        createdBy : {type: "string"},       
        purchases :{
            type: "array", 
             items: {
                type: "object", props: {
                    productId: { type: "number", empty:false, positive: true, integer: true },
                    qty: { type: "number", empty:false },
                    price: { type: "number", empty:false },
                    subtotal: { type: "number", empty:false },
                    createdBy : {type: "string"}
                }
            }
        }
    }
    const validate = v.validate(req.body, schema);
    if(validate.length){
        return res.status(422).json(validate);
    }

    // const purch = Checkouts.hasMany(Purchases, { as: 'purch' });

    // const checkouts = await Checkouts.create(req.body, {
    //     include: [{
    //         association: purch,
    //         as: 'purch'
    //     }]
    // })

    const checkouts = await Checkouts.create(req.body,{
        include: [{
            model: Purchases,
            //association: checkouts.Purchases,           
            // through: { attributes: [purchases] }
        }]
    });

    req.body.purchases.map(function(x) { 
        x.checkoutId = checkouts.id; 
        return x
    });

    const purchases = await Purchases.bulkCreate(req.body.purchases);
    const objCheckouts = {};
    objCheckouts.id = checkouts.id;
    objCheckouts.code = checkouts.code;    
    objCheckouts.firstName = checkouts.firstName;
    objCheckouts.lastName = checkouts.lastName;
    objCheckouts.address1 = checkouts.address1;
    objCheckouts.address2 = checkouts.address2;
    objCheckouts.city = checkouts.city;
    objCheckouts.state = checkouts.state;
    objCheckouts.zip = checkouts.zip;
    objCheckouts.country = checkouts.country;
    objCheckouts.total = checkouts.total;
    objCheckouts.createdBy = checkouts.createdBy;
    objCheckouts.createdAt = checkouts.createdAt;
    objCheckouts.updatedAt = checkouts.updatedAt;
    objCheckouts.updatedBy = checkouts.updatedBy;
    objCheckouts.purchases = purchases;    
    
    return res.json({
        status: 200,
        message: "Success Create Checkouts",
        data: objCheckouts
    });
});

const pad2 = (n) => {
    return n < 10 ? '0' + n : n 
}

module.exports = router;