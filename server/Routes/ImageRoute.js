const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');

router.post('/', async (req, res) => {
    const {image} = req.body
    const uploadImage = await cloudinary.uploader.upload(
        image,
        {
            folder: 'diary'
        },
        (result, error) => {
            if(error) {
                console.log(error);
            }
        }
    );
    try {
        res.status(200).json(uploadImage.secure_url);
    } catch (err) {
        res.status(500).json({message: "Diary not found!"});
    }
});

module.exports = router;