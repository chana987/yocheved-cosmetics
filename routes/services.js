const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const Service = require('../models/Service')

// @route       GET api/services
// @desc        Get all services
// @access      Public
router.get('/', async (req, res) => {
    try {
        const services = await Service.find()

        res.json(services)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// @route       POST api/services
// @desc        Add new service
// @access      Private
router.post('/', [auth, [
    check('title', 'Title is required').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, price, image, details } = req.body

        try {
            const newService = new Service({
                title,
                price,
                image,
                details
            })

            const service = await newService.save()

            res.json(service)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    })

// @route       PUT api/services/:id
// @desc        Update service
// @access      Private
router.put('/:id', auth, async (req, res) => {
    const { title, price, image, details } = req.body

    // Build service object
    const serviceFields = {}
    if (title) serviceFields.title = title
    if (price) serviceFields.price = price
    if (image) serviceFields.image = image
    if (details) serviceFields.details = details

    try {
        let service = await Service.findById(req.params.id)

        if (!service) return res.status(404).json({ msg: 'Service not found' })

        // Add auth check

        service = await Service.findByIdAndUpdate(req.params.id, { $set: serviceFields },
            { new: true })

        res.json(service)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route       DELETE api/services/:id
// @desc        delete service
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let service = await Service.findById(req.params.id)

        if (!service) return res.status(404).json({ msg: 'Service not found' })

        // Add auth check
        
        await Service.findByIdAndRemove(req.params.id)

        res.json({ msg: 'Service removed' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router