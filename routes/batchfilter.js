const express = require('express');
const router = express.Router();
const Student = require('../models/addstudent'); // Assuming this is where your model is located

// ... your other routes ...

router.get('/students/:batch', async (req, res) => {
    const selectedBatch = req.params.batch.toLowerCase();

    try {
        const students = await Student.find({
            [`batches.${selectedBatch}`]: { $ne: '' }
        });

        res.json(students);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;
