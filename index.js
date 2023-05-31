require('dotenv').config()
const express = require('express');
const app = express();
const commentsRouter = require('./routes/comments');
const PORT = process.env.PORT||5000;



app.use(express.static('public'));
app.set('view engine', 'ejs');  


app.use('/comments', commentsRouter);


app.listen(PORT);
console.log(`Server running on port ${PORT}`);