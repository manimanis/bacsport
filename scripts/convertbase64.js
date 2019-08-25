/* used to convert gif files to base64 */
const path = require('path');
const fs = require('fs');

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

//joining path of directory 
const directoryPath = path.join(__dirname, '../imgs/');

const genres = ['genre-garcon', 'genre-fille'];
const familles = ['f1', 'f2', 'f3', 'f4', 'f5'];
const difficultes = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
const stream = {};

for (const genre of genres) {
    const cssPath = path.join(__dirname, `../css/${genre}.css`);
    // function to encode file data to base64 encoded string

    stream[genre] = fs.createWriteStream(cssPath);

    stream[genre].write('.cycle { background-size: contain; background-repeat: no-repeat; background-position-x: center; background-position-y: top; }\n');

    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        //listing all files using forEach
        files.forEach(function (file) {
            if (!file.startsWith(genre + '-') || !file.endsWith('.png')) {
                return;
            }

            const filePath = path.join(directoryPath, file);

            console.log('Conveting file:', file);
            const fileParts = file.split(/[-\.]/);
            if (fileParts.length === 5 &&
                familles.includes(fileParts[2]) &&
                difficultes.includes(fileParts[3])) {
                const rule = `.${genre}.${fileParts[2]}-${fileParts[3]} { background-image: url(data:image/png;base64,${base64_encode(filePath)}); }\n`;
                stream[genre].write(rule);
            }
        });
        stream[genre].end();
    });

}

