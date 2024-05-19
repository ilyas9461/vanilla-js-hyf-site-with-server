const express = require("express");
const path = require("path");

const app = express();

app.use("/src", express.static(path.resolve(__dirname, "frontend", "src")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
    console.log(new Date().toLocaleString() + " => Server running...")
    console.log('If you show pages go to http://localhost:3000/')
});
