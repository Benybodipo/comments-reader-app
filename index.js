const express = require('express');
const app = express();
const commentsRouter = require('./routes/comments');
const port = 3500;

app.use(express.static('public'));
app.set('view engine', 'ejs');  


app.use('/comments', commentsRouter);


app.listen(port);