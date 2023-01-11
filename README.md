# NMagick
NextJs Image Magick API

## about
Next Image-magic is an image handling system via API-rest. A simple service that can be implemented in any deploi service. Highlighting Vercel's services.

## Install 
To install on a private server, just clone this repository and run it in production on your hosting service.

>- NOTE: For the service to run on your server, make sure you have NodeJs installed in the latest version or higher than 12.0.

## Vercel Install

To use this service at Vercel, it is important that you fork this repository on your Github or deploy it directly on Vercel's hosting service.

## Use

The API consists of several POST routes that you can send an image to modify, resize, add watermark and various other functions. (see full list available in nodejs sharp and gm library).

### inputs
All inputs must contain the name ``file``

### /resize
Method used to resize images. In order for it to resize the images sent, it is necessary to pass 2 parameters in the url.

- h: height
- w: width

Optional parameters are:

- f: desired file type in return. (jpeg, png, webp, tiff, ico, gif and more...)
- q: image quality

>- Note: Image quality must be set in percentage. Example: 80, 90, 100

So, the request is:

```js
$.post('/api/v1/resize?w=100&h=100&q=90&f=jpg', { file: [binary]});
```

