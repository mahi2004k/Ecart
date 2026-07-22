import multer, { memoryStorage } from 'multer'

const storage = memoryStorage()

// single upload 
export const singleUpload = multer({storage}).single("file")

// Multiple upload
export const multipleUpload = multer({storage}).array("files", 5)