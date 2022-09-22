var PdfPrinter = require('pdfmake');
var fs = require('fs');

// Define font files
var fonts = {
    Roboto: {
        normal: 'fonts/Roboto/Roboto-Regular.ttf',
        bold: 'fonts/Roboto/Roboto-Medium.ttf',
        italics: 'fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
    }
};

var printer = new PdfPrinter(fonts);

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            var docDefinition = {
                content: [
                    'First paragraph',
                    'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
                ]
            };

            var options = {z}

            var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
            pdfDoc.pipe(fs.createWriteStream('document.pdf'));
            pdfDoc.end();
            res.send(pdfDoc);
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}

