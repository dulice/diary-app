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
        res.status(200).json({photo: uploadImage.secure_url, public_id: uploadImage.public_id});
    } catch (err) {
        res.status(500).json({message: "Diary not found!"});
    }
});
router.put('/', async (req, res) => {
    const {public_id} = req.body;
    try {
        await cloudinary.uploader.destroy(public_id, (result) => {
            console.log(result)
        });
        res.status(200).json({message: "Image Delete Success"});
    } catch (err) {
        res.status(500).json({message: "Image not found!"});
    }
});

module.exports = router;