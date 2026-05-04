const express = require("express");

const router = express.Router();

const db = require("../db");



router.post("/signup",(req,res)=>{

    let {

        name,
        email,
        role,
        manager_id

    } = req.body;

    if(role !== "employee"){

        manager_id = null;

    }



    const query = `

        INSERT INTO users(

            name,
            email,
            role,
            manager_id

        )

        VALUES(?,?,?,?)

    `;



    db.query(

        query,

        [

            name,
            email,
            role,
            manager_id

        ],

        (error,result)=>{

            if(error){

                return res.status(500).json(error);

            }


            res.status(201).json({

                message:"Signup successful"

            });

        }

    );

});




router.post("/login",(req,res)=>{

    const { email } = req.body;



    const query = `

        SELECT *

        FROM users

        WHERE email = ?

    `;



    db.query(

        query,

        [email],

        (error,result)=>{

            if(error){

                return res.status(500).json(error);

            }


            if(result.length===0){

                return res.status(404).json({

                    message:"User not found"

                });

            }



            res.status(200).json(

                result[0]

            );

        }

    );

});



module.exports = router;