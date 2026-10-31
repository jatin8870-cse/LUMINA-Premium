const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../../uploads');
fs.mkdirSync(dir, { recursive: true });
const storage = multer.diskStorage({
  destination: dir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-')}`)
});
module.exports = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
