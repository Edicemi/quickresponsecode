require('dotenv').config();
const express = require('express');
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");
const qrRoute = require('./routes/index');

//middleware
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());



// //api routes
app.use('/v1', userRoute);


app.get("/", (req, res) => {
    res.render("index.ejs");
});


// app.post("/scan", (req, res) => {
//     const url = req.body.url;

//     // If the input is null return "Empty Data" error
//     if (url.length === 0) res.send("Empty Data!");

//     // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
//     // It shall be returned as a png image format
//     // In case of an error, it will save the error inside the "err" variable and display it

//     qr.toDataURL(url, (err, src) => {
//         if (err) res.send("Error occured");

//         // Let us return the QR code image as our response and set it to be the source used in the webpage
//         res.render("scan", { src });
//     });
// });

app.use(function (error, req, res, next) {

    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get("env") === "development" ? error : {};
    console.log(error);
    // render the error page
    if (!error.code) {
        return res.status(500).json({
            message: error.message || "Error processing request",
            status: false,
            data: null,
        });
    }
    return res.status(error.code).json({
        message: error.message,
        status: false,
        data: null,
    });
});


//server
app.listen(process.env.PORT, _ => {
    console.log(`Server running on PORT: ${process.env.PORT} `);
});