import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    console.log(req.rawHeaders);
})

app.get("/about", (req, res) => {
    res.send("About Page")
});

app.listen(3000, () => console.log(`Server running on port ${port}!`));