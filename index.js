const fs = require("fs");
const path = require("path");

const baseDir = "./directory";

fs.readdir(baseDir, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const ext = path.extname(file).slice(1); // remove the dot
    if (!ext) return; // skip if no extension

    const folderPath = path.join(baseDir, ext);

    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Move the file
    const oldPath = path.join(baseDir, file);
    const newPath = path.join(folderPath, file);

    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;
      console.log(`Moved: ${file} → ${ext}/`);
    });
  });
});
