import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import SetfileType from "../../../controller/SetfileType.js";

// Configure o multer para lidar com o upload de arquivos
const upload = multer({
    dest: 'public/upload/', // Define o diretório para o qual os arquivos serão enviados
    fileFilter: (req, file, callback) => {
        // Define o tipo de arquivos que serão aceitos
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
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

export const config = {
    api: {
        bodyParser: false,
    }
}

export default function (req, res) {
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=59");
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST requests allowed' })
        return;
    }

    var { w, h, q, f } = req.query;

    upload.single('file')(req, res, async (error) => {
        if (error) {
            return res.status(400).json({ error: error.message })
        }
        // Save the uploaded image to the database
        const { originalname, filename, path, mimetype } = req.file;
        var type = SetfileType(mimetype);
        const image = await sharp(path)
            .resize(parseInt(w) ?? 200, parseInt(h) ?? 200)
            .toFormat(f ?? type)
            // .jpeg({ quality: 90 })
            .toBuffer()

        res.status(200).setHeader('Content-Type', mimetype).send(image)
        deleteFile(path)
    })
}

