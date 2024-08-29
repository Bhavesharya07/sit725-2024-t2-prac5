import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db.js';
import router from './router/router.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

connectDB();
router(app);

app.get('/', (req, res) => {
    res.sendFile(new URL('index.html', import.meta.url).pathname);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
