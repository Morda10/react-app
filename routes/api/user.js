const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');



  router.get('/:id',async (req,res) => {
    try {
      const {id} = req.params;
      const user = await User.findById(id);
      if(!user){
          res.send(400).json("not found");
      }
      return res.status(200).json(user);

    } catch (error) {
      console.log("error");
    }

  });

  module.exports = router;
