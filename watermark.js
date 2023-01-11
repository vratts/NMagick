const gm = require('gm').subClass({ imageMagick: true });
const request = require('request');
const fs = require('fs');

const imageUrl = 'http://example.com/image.jpg';
const watermarkUrl = 'http://example.com/watermark.png';
const outputPath = 'output.jpg';

// Baixar a imagem
request.get(imageUrl)
    .pipe(fs.createWriteStream('image.jpg'))
    .on('close', function () {
        // Baixar a marca d'água
        request.get(watermarkUrl)
            .pipe(fs.createWriteStream('watermark.png'))
            .on('close', function () {
                // Adicionar a marca d'água à imagem
                gm('image.jpg')
                    .composite('watermark.png')
                    .gravity('SouthEast')
                    .write(outputPath, function (err) {
                        if (!err) console.log('Done!');
                    });
            });
    });