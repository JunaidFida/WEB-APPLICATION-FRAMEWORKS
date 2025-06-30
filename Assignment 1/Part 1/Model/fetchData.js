const axios = require("axios");
const mongoose = require("mongoose");

const countries = ["Pakistan", "USA", "UK", "France", "Japan"];

const universitySchema = new mongoose.Schema({
    name: String,
    country: String,
    city: String,
    web_pages: [String],
    alpha_two_code: String,
});

const University = mongoose.model("University", universitySchema);

async function fetchAndStore(country) {
    const apiUrl = `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`;
    const response = await axios.get(apiUrl);
    const universities = response.data;

    await University.insertMany(universities.map((uni) => ({
        name: uni.name,
        country: uni.country,
        city: uni["state-province"] || "Unknown",
        web_pages: uni.web_pages,
        alpha_two_code: uni.alpha_two_code,
    })));

    console.log(`Data for ${country} stored successfully.`);
}

async function main() {
    mongoose.connect("mongodb://localhost:27017/universityDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    for (const country of countries) {
        await fetchAndStore(country);
    }

    mongoose.connection.close();
}

main();
