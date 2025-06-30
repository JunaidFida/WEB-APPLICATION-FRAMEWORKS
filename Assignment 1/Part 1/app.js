const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/universityDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Database connection error:", err));

const universitySchema = new mongoose.Schema({
    name: String,
    country: String,
    city: String,
    web_pages: [String],
    alpha_two_code: String,
});

const University = mongoose.model("University", universitySchema);

// Routes

// Fetch and store data for a specific country
app.get("/fetch_country_data/:country", async (req, res) => {
    const country = req.params.country;
    const apiUrl = `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`;
    try {
        const response = await axios.get(apiUrl);
        const universities = response.data;

        // Save data to the database
        await University.insertMany(universities.map((uni) => ({
            name: uni.name,
            country: uni.country,
            city: uni["state-province"] || "Unknown",
            web_pages: uni.web_pages,
            alpha_two_code: uni.alpha_two_code,
        })));

        res.send(`Data for ${country} has been successfully stored.`);
    } catch (error) {
        res.status(500).send("Error fetching and storing data.");
    }
});

// Find universities in the capital cities
app.get("/universities_in_capitals", async (req, res) => {
    try {
        const capitals = ["Islamabad", "Washington", "London", "Paris", "Tokyo"];
        const universities = await University.find({ city: { $in: capitals } });
        res.json(universities);
    } catch (error) {
        res.status(500).send("Error fetching universities in capitals.");
    }
});

// Add a new university
app.post("/add_university", async (req, res) => {
    const { name, country, city, web_pages, alpha_two_code } = req.body;
    try {
        const newUniversity = new University({ name, country, city, web_pages, alpha_two_code });
        await newUniversity.save();
        res.send(`University "${name}" has been added.`);
    } catch (error) {
        res.status(500).send("Error adding university.");
    }
});

// Delete a university by name
app.delete("/delete_university/:name", async (req, res) => {
    const name = req.params.name;
    try {
        const result = await University.deleteOne({ name });
        if (result.deletedCount) {
            res.send(`University "${name}" has been deleted.`);
        } else {
            res.send(`University "${name}" not found.`);
        }
    } catch (error) {
        res.status(500).send("Error deleting university.");
    }
});

// Update university information
app.put("/update_university/:name", async (req, res) => {
    const name = req.params.name;
    const update = req.body;
    try {
        const result = await University.updateOne({ name }, update);
        if (result.matchedCount) {
            res.send(`University "${name}" has been updated.`);
        } else {
            res.send(`University "${name}" not found.`);
        }
    } catch (error) {
        res.status(500).send("Error updating university.");
    }
});

// Fetch all universities for a specific country
app.get("/universities_by_country/:country", async (req, res) => {
    const country = req.params.country;
    try {
        const universities = await University.find({ country });
        res.json(universities);
    } catch (error) {
        res.status(500).send("Error fetching universities by country.");
    }
});

app.use(express.static(path.join(__dirname, "Public")));

app.get("/see_country_universities", (req, res) => {
    res.sendFile(path.join(__dirname, "Views", "countryUniversities.html"));
});

app.get("/search_university", (req, res) => {
    res.sendFile(path.join(__dirname, "Views", "searchUniversity.html"));
});

// Form submissions for country universities
app.post("/country_universities", async (req, res) => {
    const country = req.body.country;
    const apiUrl = `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`;
    try {
        const response = await axios.get(apiUrl);
        const universities = response.data;
        res.send(`
            <h1>Universities in ${country}</h1>
            <ul>
                ${universities.map((uni) => `<li>${uni.name}</li>`).join("")}
            </ul>
            <p>Total Universities: ${universities.length}</p>
        `);
    } catch (error) {
        res.status(500).send("Error fetching data. Please try again later.");
    }
});

// form submissions for university search
app.post("/search_university_result", async (req, res) => {
    const universityName = req.body.universityName;
    const apiUrl = `http://universities.hipolabs.com/search?name=${encodeURIComponent(universityName)}`;
    try {
        const response = await axios.get(apiUrl);
        const university = response.data[0]; // Assuming the first match is relevant
        if (university) {
            res.send(`
                <h1>University: ${university.name}</h1>
                <p>Web Page: <a href="${university.web_pages[0]}" target="_blank">${university.web_pages[0]}</a></p>
            `);
        } else {
            res.send(`<p>No university found with the name "${universityName}".</p>`);
        }
    } catch (error) {
        res.status(500).send("Error fetching data. Please try again later.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
