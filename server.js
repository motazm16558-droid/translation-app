const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
    try {
        const { text, source, target } = req.body;

        const response = await axios.get(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
        );

        const translated =
            response.data?.responseData?.translatedText ||
            "Translation not available";

        res.json({
            translatedText: translated
        });

    } catch (error) {
        console.log("ERROR:", error.message);
        res.json({ translatedText: "API Error" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});