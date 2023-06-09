require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();
const fetch = require('node-fetch');


const fetchComments = async (req, res, next) => {
    try {
        const url = process.env.API_URL;
        const response = await fetch(url);
        const data = await response.json();

        if (typeof data === 'string') {
            await fetchComments();
        }
        return data;
    } catch (error) {
        return error;
    }
        
}

router.get('/', async (req, res) => {
    const comments = await fetchComments();
    
    /**
     * Pagination
     */
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const data = (comments.length) ? comments.slice(skip, skip + limit) : comments;
    const totalPages = (comments.length) ? Math.ceil(comments.length / limit) : 0;
    
    res.render('index', {comments: data, page, totalPages, totalRecords: comments.length});
});

router.get('/:id', async (req, res) => {
    
    try {
        const url = `${process.env.API_UR}/${req.params.id}`;
        const response = await axios.get(url);
        
        const comment = response.data;

        res.render('index', {comment});
    } catch (error) {
        return error;
    }

});

module.exports = router;