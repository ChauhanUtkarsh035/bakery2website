const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

// For serving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded());

// Set the views directory
app.set('views', path.join(__dirname, 'views'))

// Set the template engine as html
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')


app.get("/", (req, res) => {
    res.status(200).render('index.html');
});
app.get("/about", (req, res) => {
    res.status(200).render('about.html');
});
app.get("/contact", (req, res) => {
    res.status(200).render('contact.html');
});
app.get("/recipies", (req, res) => {
    res.status(200).render('recipies.html');
});
app.get("/cakes", (req, res) => {
    res.status(200).render('cakes.html');
});


app.post('/', (req, res) => {
    console.log(req.body)
    Email = req.body.Email
    message = req.body.message

    let outputToWrite = `Email id is: ${Email}, Query is: ${message}`
    fs.writeFileSync('output.txt', outputToWrite) // to write the data in external file
    const params = { 'message': 'You have signed up successfully' }
    res.status(200).render('contact.html', params);
});

//server start

app.listen(port, () => {
    console.log(`started successfully on port ${port}`)
})