const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const Post = require('../models/Post')

// @route       GET api/posts
// @desc        Get all posts
// @access      Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })

        res.json(posts)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// @route       POST api/posts
// @desc        Add new post
// @access      Private
router.post('/', [auth, [
    check('title', 'Title is required').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, body, image } = req.body

        try {
            const newPost = new Post({
                title,
                body,
                image
            })

            const post = await newPost.save()

            res.json(post)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    })

// @route       PUT api/posts/:id
// @desc        Update post
// @access      Private
router.put('/:id', auth, async (req, res) => {
    const { title, body, image } = req.body

    // Build post object
    const postFields = {}
    if (title) postFields.title = title
    if (body) postFields.body = body
    if (image) postFields.image = image

    try {
        let post = await Post.findById(req.params.id)

        if (!post) return res.status(404).json({ msg: 'Post not found' })

        post = await Post.findByIdAndUpdate(req.params.id, { $set: postFields },
            { new: true })

        res.json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route       DELETE api/posts/:id
// @desc        Delete post
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)

        if (!post) return res.status(404).json({ msg: 'Post not found' })

        await Post.findByIdAndRemove(req.params.id)

        res.json({ msg: 'Post removed' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router