const path = require("path");
const CustomError = require("../lib/customError");
const responseHandler = require("../utils/responseHandler");
const qr = require("qrcode");

exports.scanQuickResponseCode = async (req, res, next) => {
    try {
        const url = req.body.url;

        // If the input is null return "Empty Data" error
        if (url.length === 0) throw new CustomError(400, "Empty Data!");

        // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
        // It shall be returned as a png image format
        // In case of an error, it will save the error inside the "err" variable and display it

        qr.toDataURL(url, (err, src) => {
            if (err) throw new CustomError(500, "Error occured");

            // Let us return the QR code image as our response and set it to be the source used in the webpage
            res.render("scan", { src });
        });
    } catch (error) {
        next(error);
    }
}
