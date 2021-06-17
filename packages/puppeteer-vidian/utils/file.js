const fs = require('fs');

const writeFile = (path = './token.js', data) => fs.writeFile(__dirname + `/${path}`, data, function (err) {
    if (err) {
        console.log('err', err);
    }
    return true
})

module.exports = {
    writeFile
}