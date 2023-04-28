import df from "../../../controller/DefaultFunctions.js";
import SetfileType from "../../../controller/SetfileType.js";

export const config = {
    api: {
        bodyParser: false,
    }
}

export default function (req, res) {
    // res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=59");
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST requests allowed' })
        return;
    }

    var { w, h, q, f, i } = req.query;
    
    df.upload.array('file', 2)(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        const { originalname, filename, path, mimetype } = req.files[0];
        var type = SetfileType(mimetype);
        var meta = {
            type: f ?? type,
            height: parseInt(h ?? 200),
            width: parseInt(w ?? 200)
        }
        var img = await df.CreateWatermark(path, i ?? req.files[1].path, meta);
        res.status(200).setHeader('Content-Type', mimetype).send(img)
    })
}
