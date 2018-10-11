const express = require("express")
const bodyParser = require("body-parser")
const methodOverride = require("method-override");
const Canvas = require("./models/tut")
app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));

const port = 3000

app.listen(port, () => {
    console.log("im listening to everything you do, Scincerly the FBI")

})

