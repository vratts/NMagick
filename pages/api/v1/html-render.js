// import * as htmlToImage from 'html-to-image';
import { createCanvas } from 'canvas';
import htmlToImage from 'node-html-to-image';
import fs from 'fs';

export default async function (req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST requests allowed' })
        return;
    }

    var body = req.body;
    await htmlToImage({
        output: '/tmp/upload',
        html: body.html
    });

    const image = fs.readFileSync('/tmp/upload');
    const base64Image = new Buffer.from(image).toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64Image;
    res.json({ status: true, dataURI })
}