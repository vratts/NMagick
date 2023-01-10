const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const app = express()

// Configure o multer para lidar com o upload de arquivos
const upload = multer({
  dest: 'uploads/', // Define o diretório para o qual os arquivos serão enviados
  fileFilter: (req, file, callback) => {
    // Define o tipo de arquivos que serão aceitos
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Apenas imagens são permitidas'))
    }
    callback(null, true)
  }
})

app.post('/api/upload', upload.single('image'), async (req, res) => {
  // Use o multer para lidar com o upload do arquivo
  const file = req.file
  if (!file) {
    res.status(400).send('Nenhum arquivo foi enviado')
    return
  }

  // Redimensione a imagem, se desejar
  const image = await sharp(file.path)
    .resize(300, 300)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer()

  // Envie o arquivo de volta como resposta
  res.send(image)
})