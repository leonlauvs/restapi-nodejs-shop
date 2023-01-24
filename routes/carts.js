const express = require('express');
const router = express.Router();
const { Carts } = require("../models");
const { Products } = require("../models");
const validator = require("fastest-validator");
const v = new validator();
const verify = require('../middleware/verify');
const sequelize = require('sequelize');

Products.hasOne(Carts);
Carts.belongsTo(Products);

router.get("/", async function(req , res, next){
    let productId = req.query.productId
    try{
        let carts 

        if (productId != null){
            carts = await Carts.findOne({
                where: {
                    productId: productId
                }
              });
        }
        else{
            carts = await Carts.findAll();
        }

        return res.json({
            status: 200,
            message: "Success Show Carts",
            data: carts
        })
    }
    catch (error) {
        return res.status(404).json({
          status: 404,
          message: `Terjadi Error : ${error}`,
        });
      }
    
});

router.get("/count", async function(req , res, next){
    try{
        let carts = await Carts.findOne({
            
            attributes: [
                [sequelize.fn('sum',sequelize.col('qty')), 'count']
            ],
            raw: true
        });

        return res.json({
            status: 200,
            message: "Success Show Count",
            data: carts
        })
    }
    catch (error) {
        return res.status(404).json({
          status: 404,
          message: `Terjadi Error : ${error}`,
        });
      }
    
});

router.get("/subtotal", async function(req , res, next){
    try{
        let carts = await Carts.findAll({
            include: [{
                model: Products,
            attributes: []
            }],
            attributes: [
                'id','productId','Product.name','qty','Product.price',
                [sequelize.literal('(carts.qty*price)'), 'subtotal'],
                'Product.image'
            ],
            raw: true
        });

        return res.json({
            status: 200,
            message: "Success Show Subtotal",
            data: carts
        })
    }
    catch (error) {
        return res.status(404).json({
          status: 404,
          message: `Terjadi Error : ${error}`,
        });
      } 
});

router.get("/total", async function(req , res, next){
    try{
        let carts = await Carts.findAll({
            include: [{
                model: Products,
            attributes: []
            }],
            attributes: [
                [sequelize.fn('sum',sequelize.literal('(carts.qty*price)')), 'total']
            ],
            raw: true
        });

        return res.json({
            status: 200,
            message: "Success Show Total",
            data: carts
        })
    }
    catch (error) {
        return res.status(404).json({
          status: 404,
          message: `Terjadi Error : ${error}`,
        });
      }
    
});

router.get("/:id", async function(req , res){
    const id = req.params.id;
    let carts = await Carts.findByPk(id);

    if(!carts){
        return res.status(404).json({
            status: 404,
            message: "Carts not found",
        })
    }

    return res.json({
        status: 200,
        message: "Success Show Carts",
        data: carts
    })
});

router.get("prod/:id", async function(req , res){
    const id = req.params.id;
    let carts = await Carts.findAll({
        where: {
          productId: id
        }
      })

    if(!carts){
        return res.status(404).json({
            status: 404,
            message: "Carts not found",
        })
    }

    return res.json({
        status: 200,
        message: "Success Show Carts",
        data: carts
    })
});

router.put("/edit/:id", async function(req , res){

    const schema = {
        qty: { type: "number", empty:false },
        updatedBy: { type: "string"}
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(422).json(validate);
    }

    const id = req.params.id;
    let carts = await Carts.findByPk(id);

    if(!carts){
        return res.status(404).json({
            status: 404,
            message: "Carts not found",
        })
    }

    carts = await carts.update(req.body);

    return res.json({
        status: 200,
        message: "Success Update Carts",
        data: carts
    })
});

router.delete("/delete/:id", async function(req , res){
    
   const id = req.params.id;
    let carts = await Carts.findByPk(id);

    if(!carts){
        return res.status(404).json({
            status: 404,
            message: "Carts not found",
        })
    }
    await carts.destroy();

    return res.json({
        status: 200,
        message: `Success delete cart ${carts.name}`,
    })
});

router.post("/create", async function(req , res, next){
 
    const schema = {
        productId: { type: "number", empty:false, positive: true, integer: true },//"string",
        qty: { type: "number", empty:false },// "number",
        createdBy : {type: "string"}       
    }

    const validate = v.validate(req.body, schema);
    if(validate.length){
        return res.status(422).json(validate);
    }

    const carts = await Carts.create(req.body);
    return res.json({
        status: 200,
        message: "Success Create Carts",
        data: carts
    });
});


module.exports = router;