const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
// Enable cors for corss-origin requests
app.use(cors());

// function to load JSON file
const loadData = (filename) => {
    const filePath = path.join(__dirname, "data", filename);
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    return null;
};

// API routes
app.get("/", (req, res) => {
    res.send("Word API mein aapka swagat hai! word API ke liye proyog karo /api/:category");
});
app.get("/api/:category", (req, res) => {
    const category = req.params.category.toLowerCase();
    const data = loadData(`${category}.json`);

    if (data) {
        res.json(data);
    }
    else {
        res.status(404).json({ error: "Category nahi mila!" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});