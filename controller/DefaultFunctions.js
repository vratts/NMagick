import sharp from "sharp";
import multer from "multer";

function CreateWatermark(img = '', water = '', meta = {}) {
    return new Promise((result, reject) => {
        sharp(img)
            .composite([{
                input: water,
                gravity: 'southeast'
            }])
            .toFormat(meta.type)
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