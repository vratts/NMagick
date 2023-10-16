import htmlToImage from "html-to-image";

export default async function (req, res){
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=59");
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST requests allowed' })
        return;
    }

    var body = req.body;
    console.log(body)
    const imagemBase64 = await htmlToImage.toPng(body.html);
    res.json({
        status: true,
        content: imagemBase64
    });
}