const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const About = require('../models/About')

// @route       GET api/about
// @desc        Get about
// @access      Public
router.get('/', async (req, res) => {
    try {
        const about = await About.find()

        res.json(about)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// @route       PUT api/about/:id
// @desc        Update about
// @access      Private
router.put('/:id', auth, async (req, res) => {
    const { title, text, phone, email, address } = req.body

    // Build about object
    const aboutFields = {}
    if (title) aboutFields.title = title
    if (text) aboutFields.text = text
    if (phone) aboutFields.phone = phone
    if (email) aboutFields.email = email
    if (address) aboutFields.address = address

    try {
        let about = await About.findById(req.params.id)

        if (!about) return res.status(404).json({ msg: 'About not found' })

        about = await About.findByIdAndUpdate(req.params.id, { $set: aboutFields },
            { new: true })

        res.json(about)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


// @route       POST api/about
// @desc        Add new about
// @access      Private
router.post('/', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('text', 'Text is required').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, text, phone, email, address } = req.body

        try {
            const newAbout = new About({
                title, text, phone, email, address
            })

            const about = await newAbout.save()

            res.json(about)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    })

module.exports = router