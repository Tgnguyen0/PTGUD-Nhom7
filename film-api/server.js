import axios from "axios";
import express from "express";

const app = express();
const apiKey = 'c8f537d9';

app.get("/movies/:name", async (req, res) => {
    const movieName = req.params.name;

    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

//http://localhost:3000/movies/Inception
app.get("/", (req, res) => {
    res.send("Welcome to the Movie API!");
});
