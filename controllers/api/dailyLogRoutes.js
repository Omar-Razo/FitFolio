const router = require('express').Router();
const { DailyLog } = require('../../models');
const withAuth = require('../../utils/auth');

//updates daily log entry with new data (increment)
router.put('/', withAuth, async (req, res) => {
    try {
        console.log("Req.Body Info", req.body)
        const currentDate = new Date().toISOString().slice(0, 10); 
        const existingLog = await DailyLog.findOne({ 
            where: { date_created: currentDate , user_id: req.session.user_id 
        }})
        console.log("Existing Log info", existingLog)

        const updatedLog = await existingLog.increment(req.body.statType, { by: req.body.amount })
        res.status(200).json(updatedLog)
    } catch {
        res.status(500).json(err);
        console.log(err)
    }
})

module.exports = router