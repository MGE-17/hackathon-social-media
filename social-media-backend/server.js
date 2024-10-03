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
const peopleDirectory = process.env.PEOPLE_DIRECTORY || __dirname + '/data/people';
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

app.use(cors());
app.use(express.json());

app.use('/images', express.static(imagesDirectory));
app.use('/people', express.static(peopleDirectory));

// Function to get a random subset of comments from the provided comments array
function getRandomComments(comments, min = 3, max = 5) {
    // Calculate a random number of comments to select, between the min and max values (inclusive)
    const numberOfComments = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Shuffle the comments array randomly
    const shuffled = comments.sort(() => 0.5 - Math.random());
    
    // Return a slice of the shuffled array, containing the calculated number of comments
    let selectedComments = shuffled.slice(0, numberOfComments);

    return selectedComments;
}

// New function to handle reading and writing comments
function handleComments(res, imageUrl, imageName) {
    fs.readFile('./data/groundtruthcomments.json', 'utf8', (readErr, data) => {
        if (readErr) {
            console.error('Error reading groundtruthcomments.json:', readErr);
            return res.status(500).json({ error: 'Failed to read ground truth comments.' });
        }

        let groundTruthComments = [];
        try {
            groundTruthComments = JSON.parse(data);
            if (!Array.isArray(groundTruthComments)) {
                groundTruthComments = [];
            }
        } catch (parseErr) {
            console.error('Error parsing groundtruthcomments.json:', parseErr);
            return res.status(500).json({ error: 'Failed to parse ground truth comments.' });
        }

        const selectedComments = getRandomComments(groundTruthComments);

        //overwrites all existing comments in the json file
        fs.writeFile(jsonFilePath, JSON.stringify(selectedComments, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to comments.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save comments.' });
            }

            res.json({ imageUrl, imageName: imageName });
        });
    });
}

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
        //changes it from "dried-leaves.jpg" to "Dried Leaves"
        const imageName = files[randomIndex].replace(/\.[^/.]+$/, "").replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
        const imageUrl = `${baseUrl}/images/${files[randomIndex]}`;

        handleComments(res, imageUrl, imageName);
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
        profile: `${baseUrl}/people/image${Math.floor(Math.random() * 25)}.jpeg`,
        likes: 0,
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