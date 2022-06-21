const router = require('express').Router();
const Diary = require('../models/Diary');

router.get('/', async (req, res) => {
    try {
        const diaries = await Diary.find();
        res.status(200).json(diaries);
    } catch (err) {
        res.status(500).json({message: "Diary not found!"});
    }
})

router.post('/', async (req, res) => {
    const diary = new Diary(req.body);
    try {
        const saveDiary = await diary.save();
        res.status(200).json(saveDiary);
    } catch (err) {
        res.status(500).json({message: "Diary not found!"});
    }
});

router.get('/search', async (req, res) => {
    const searchQuery = req.query.q || '';
    const sortby = req.query.sortby;
    try {
        const queryFilter = searchQuery && searchQuery !== 'all'
        ? {
            name: {
                $regex: searchQuery,
                $options: 'i'
            }
        } : {};
        
        const sortTime = sortby === 'newest' ? { date: -1} : {date : 1}

        const diaries = await Diary.find({...queryFilter}).sort(sortTime);
    
        res.status(200).json(diaries);
    } catch (err) {
        res.status(500).json({message: "Diaries not found."})
    }
});

router.get('/:id', async (req, res) => {
    const diary = await Diary.findById(req.params.id);
    try {
        res.status(200).json(diary);
    } catch (err) {
        res.status(500).json({message: "Diary not found!"});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const diary = await Diary.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true});
        res.status(200).json(diary);
    } catch (err) {
        res.status(500).json({message: "Diary not found!"});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Diary.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Delete Successfully"});
    } catch (err) {
        res.status(500).json({message: "Diary not found!"});
    }
});

module.exports = router;