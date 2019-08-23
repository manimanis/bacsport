const path = require('path');
const fs = require('fs');

//joining path of directory 
const directoryPath = path.join(__dirname, 'imgs/genre-garcon');

const cssPath = path.join(__dirname, 'css/genre-garcon-images.css');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

var stream = fs.createWriteStream(cssPath);

stream.write('.cycle { background-size: contain; height: 3cm; background-repeat: no-repeat; background-position-x: center; background-position-y: top; }\n');

fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    const familles = ['f1', 'f2', 'f3', 'f4', 'f5'];
    const difficultes = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
    //listing all files using forEach
    files.forEach(function (file) {
        if (!file.endsWith('gif')) {
            return;
        }

        const filePath = path.join(directoryPath, file);

        console.log('Conveting file:', file);
        const fileParts = file.split(/[_\.]/);
        if (fileParts.length === 4 &&
            +fileParts[1] >= 1 && +fileParts[1] <= 9 &&
            +fileParts[2] >= 1 && +fileParts[2] <= 5) {
            const rule = `.${familles[+fileParts[2] - 1]}-${difficultes[+fileParts[1] - 1]} { background-image: url(data:image/gif;base64,${base64_encode(filePath)}); }\n`;
            stream.write(rule);
        }
    });
    stream.end();
});
