const express = require('express');
const axios = require('axios');
const router = express.Router();


const fetchComments = async (req, res, next) => {
    try {
        const url = 'http://127.0.0.1:8080/api/comments';
        const response = await axios.get(url);
        
        return response.data;
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
    const data = comments.slice(skip, skip + limit);
    const totalPages = Math.ceil(comments.length / limit);

    res.render('index', {comments: data, page, totalPages, totalRecords: comments.length});
});

router.get('/:id', async (req, res) => {
    
    try {
        const url = `http://127.0.0.1:8080/api/comments/${req.params.id}`;
        const response = await axios.get(url);
        
        const comment = response.data;

        res.render('index', {comment});
    } catch (error) {
        return error;
    }

});

module.exports = router;