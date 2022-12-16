const express = require('express');
const router = express.Router();
const { Products } = require("../models");
const validator = require("fastest-validator");
const v = new validator();
const verify = require('../middleware/verify');

// router.get("/", function(req , res, next){
//     // res.send(`Belajar ${req.query.isi}`);
//     res.send(`Belajar Node JS`);
// });

router.get("/", verify, async function(req , res, next){
    // res.send(`Belajar ${req.query.isi}`);
    let products = await Products.findAll();

    return res.json({
        status: 200,
        message: "Success Show Products",
        data: products
    })
});

router.get("/:id", async function(req , res){
    // res.send(`Belajar ${req.query.isi}`);
    const id = req.params.id;
    let products = await Products.findByPk(id);

    if(!products){
        return res.status(404).json({
            status: 404,
            message: "Products not found",
        })
    }

    return res.json({
        status: 200,
        message: "Success Show Products",
        data: products
    })
});

router.put("/edit/:id", async function(req , res){

    const schema = {
        name: "string",
        price: "number",
        image: "string|optional"
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(422).json(validate);
    }

    const id = req.params.id;
    let products = await Products.findByPk(id);

    if(!products){
        return res.status(404).json({
            status: 404,
            message: "Products not found",
        })
    }

    products = await products.update(req.body);

    return res.json({
        status: 200,
        message: "Success Update Products",
        data: products
    })
});

router.delete("/delete/:id", async function(req , res){
    
   const id = req.params.id;
    let products = await Products.findByPk(id);

    if(!products){
        return res.status(404).json({
            status: 404,
            message: "Products not found",
        })
    }
    // let productName = products.name;
    await products.destroy();

    return res.json({
        status: 200,
        message: `Success delete product ${products.name}`,
    })
});

router.post("/create", async function(req , res, next){
    // try{}
    // catch(e){

    // }
    const schema = {
        name: "string",
        price: "number",
        image: "string|optional"
    }

    const validate = v.validate(req.body, schema);
    if(validate.length){
        return res.status(422).json(validate);
    }

    const products = await Products.create(req.body);
    return res.json({
        status: 200,
        message: "Success Create Products",
        data: products
    });
});


module.exports = router;