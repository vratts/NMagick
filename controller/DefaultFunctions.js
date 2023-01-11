import sharp from "sharp";
import multer from "multer";
import axios from "axios";
import fs from "fs";

function CreateWatermark(img = '', water = '', meta = {}) {
    return new Promise(async (result, reject) => {
        if(water.includes('http')){
            var src = await axios(water, { responseType: 'arraybuffer' });
            water = Buffer.from(src.data, 'binary');
            await fs.promises.writeFile('/tmp/upload/tmpwater', water);
            water = '/tmp/upload/tmpwater';
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