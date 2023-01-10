export default function (mimetype = '') {
    if (mimetype.includes('jpeg') || mimetype.includes('jpg'))
        return 'jpeg';
    if (mimetype.includes('png'))
        return 'png';
    if (mimetype.includes('webp'))
        return 'webp';
    if (mimetype.includes('gif'))
        return 'gif';
    if(mimetype.includes('svg'))
        return 'svg';
    if(mimetype.includes('bmp'))
        return 'bmp';
    if(mimetype.includes('tiff'))
        return 'tiff';
}