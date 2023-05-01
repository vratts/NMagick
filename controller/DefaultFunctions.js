import sharp from "sharp";
import multer from "multer";
import axios from "axios";
import fs from "fs";

function rand(min = 1, max = 9999) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function CreateWatermark(img = '', water = '', meta = {}) {
    return new Promise(async (result, reject) => {
        if (water.includes('http')) {
            var rd = water.split('/').reverse()[0];
            var src = await axios(water, { responseType: 'arraybuffer' });
            water = Buffer.from(src.data, 'binary');
            await fs.promises.writeFile('/tmp/upload/tmpwater_' + rd, water);
            water = '/tmp/upload/tmpwater_' + rd;
        }
        sharp(img)
            .composite([{
                input: water,
                gravity: 'southeast'
            }])
            .toFormat(meta.type)
            .resize(parseInt(meta.width ?? 200), parseInt(meta.height ?? 200))
            .toBuffer()
            .then((data) => {
                result(data);
            })
            .catch((err) => {
                reject(err);
            });
    })
}

const upload = multer({
    dest: '/tmp/upload/', // Define o diretório para o qual os arquivos serão enviados
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp|gif|tiff|ico)$/)) {
            return callback(new Error('Apenas imagens são permitidas'))
        }
        callback(null, true)
    }
})

const deleteFile = async (filePath) => {
    try {
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error(err);
    }
};

export default {
    CreateWatermark, upload, deleteFile
}