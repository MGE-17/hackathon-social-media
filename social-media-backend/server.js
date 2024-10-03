import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const jsonFilePath = process.env.JSON_FILE_PATH || './data/comments.json';
const imagesDirectory = process.env.IMAGES_DIRECTORY || __dirname + '/data/images';
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

app.use(cors());
app.use(express.json());

app.use('/images', express.static(imagesDirectory));

app.get('/image', (req, res) => {
    fs.readdir(imagesDirectory, (err, files) => {
        if (err) {
            console.error('Error reading images directory:', err);
            return res.status(500).json({ error: 'Failed to retrieve images.' });
        }

        if (files.length === 0) {
            return res.status(404).json({ error: 'No images found.' });
        }

        // Select a random image
        const randomIndex = Math.floor(Math.random() * files.length);
        const randomImage = files[randomIndex].replace(/\.[^/.]+$/, "");
        const imageUrl = `${baseUrl}/images/${files[randomIndex]}`;

        // Reset comments in comments.json
        fs.writeFile(jsonFilePath, '[]', 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error resetting comments:', writeErr);
            }
            res.json({ imageUrl, imageName: randomImage });
        });
    });
});

app.post('/comments', (req, res) => {
    const { name, comment } = req.body;

    if (!name || !comment) {
        return res.status(400).json({ error: 'Name and comment are required.' });
    }

    const newComment = {
        id: uuidv4(),
        name,
        comment,
        timestamp: Date.now()
    };

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading comments.json:', err);
            return res.status(500).json({ error: 'Failed to read comments.' });
        }

        let comments = [];
        try {
            comments = JSON.parse(data);
            if (!Array.isArray(comments)) {
                comments = [];
            }
        } catch (parseErr) {
            console.error('Error parsing comments.json:', parseErr);
            return res.status(500).json({ error: 'Failed to parse comments.' });
        }

        comments.push(newComment);

        fs.writeFile(jsonFilePath, JSON.stringify(comments, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to comments.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save comment.' });
            }

            res.status(201).json({ message: 'Comment added successfully.', comment: newComment });
        });
    });
});

app.get('/comments', (req, res) => {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading comments.json:', err);
            return res.status(500).json({ error: 'Failed to read comments.' });
        }
        try {
            const comments = JSON.parse(data);
            res.json(comments);
        } catch (parseErr) {
            console.error('Error parsing comments.json:', parseErr);
            res.status(500).json({ error: 'Failed to parse comments.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running and listening on port ${port}`);
});