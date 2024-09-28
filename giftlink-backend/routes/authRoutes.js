const express = require('express');

const connectToDatabase = require("../models/db");
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`.
        const db = await connectToDatabase();
        // Task 2: Access MongoDB `users` collection
        const collection = db.collection("users");
        // Task 3: Check for user credentials in database
        const theUser = await collection.findOne({ email: req.body.email });
        // Task 4: Task 4: Check if the password matches the encrypyted password and send appropriate message on mismatch
        if (theUser) {
            let result = await bcryptjs.compare(req.body.password, theUser.password)
          if(!result) {
                logger.error('Passwords do not match');
                return res.status(404).json({ error: 'Wrong pasword' });
            }
            //continue other tasks
        }        
        // Task 5: Fetch user details from database
        const userName = theUser.firstName;
        const userEmail = theUser.email;        
        // Task 6: Create JWT authentication if passwords match with user._id as payload
        let payload = {
            user: {
                id: theUser._id.toString(),
            },
        };
        jwt.sign(user._id, JWT_SECRET)        
        // Task 7: Send appropriate message if user not found
        if (theUser) {
            res.json({authtoken, userName, userEmail });
            // Tasks 1-6 as done previously
            } else {
                logger.error('User not found');
                return res.status(404).json({ error: 'User not found' });
            }        
    } catch (e) {
         return res.status(500).send('Internal server error');

    }
});
module.exports = router;
