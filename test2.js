import multer from 'multer'
import { createWrapper } from 'next-redux-wrapper'
import store from '../store'

const wrapper = createWrapper(store)

// Configure multer to handle file uploads
const upload = multer({ dest: 'uploads/' })

// Define a middleware that checks if the user is authenticated
const authenticate = (ctx) => {
    if (!ctx.store.getState().user.authenticated) {
        ctx.res.status(401).json({ error: 'Unauthorized' })
    }
}

// Wrap the route handler in the authenticate middleware
const withAuth = (handler) => wrapper(async (ctx) => {
    authenticate(ctx)
    return await handler(ctx)
})

// Define the API route for uploading images
export const config = {
    api: {
        bodyParser: false,
    },
}

export default withAuth(async (req, res) => {
    // Handle the file upload
    upload.single('image')(req, res, async (error) => {
        if (error) {
            return res.status(400).json({ error: error.message })
        }
        // Save the uploaded image to the database
        const { originalname, filename } = req.file
        const image = new Image({
            originalname,
            filename,
        })
        try {
            await image.save()
            res.status(200).json({ message: 'Image uploaded successfully' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })
})
