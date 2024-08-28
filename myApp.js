require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express');
let app = express();


//1st solution
//app.get('/', (req, res) => {
// res.send('Hello Express');
//});
// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/json', (req, res) => {
    
    let message = "Hello json";

    //Check environment variable message

    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }
    
    res.json({"message": message});
});

//API endpoint to handl GET requests at /name

app.get('/name', (req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    const fullName = `${firstName} ${lastName}`;
    res.json({name: fullName});

})

app.post('/name', (req, res) => {
    const firstName = req.body.first; // Extract first name from the request body
    const lastName = req.body.last; // Extract last name from the request body
    const fullName = `${firstName} ${lastName}`; // Combine first and last names
    res.json({ name: fullName }); // Respond with a JSON object containing the full name
});

//middleware function chained for the now route

app.get('/now', (req, res, next) => {
    req.time = new Date().toString(); //Middleware function which adds "timestampe to request"
    next();
}, (req, res) => {
    res.json({ time: req.time});
});

//Echo server using get request

app.get('/:word/echo', (req, res) => {
    const word = req.params.word; //Extract the word from route paramter
    res.json({echo: word}); //Respond with JSON object with the word
});


// Solution to send HTML file

app.get('/', (req, res) =>  { //Send using the path module
    //Store the file as variable for reading
    const absolutePath = __dirname + '/views/index.html';
    //Send the variable/file
    res.sendFile(absolutePath);
});

app.use('/public', express.static(__dirname + '/public'));


console.log("Hello World");






























 module.exports = app;
