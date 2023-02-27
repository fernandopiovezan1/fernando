const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: '../../key-file.json'
});

module.exports.uploadFile = async function(project, fileName) {
    await storage.bucket(project + '.appspot.com').upload('../../' + fileName, {
        destination: 'deploy/'  + fileName
    }, function (err, file) {
        if(err) {
            console.log(err);
        }
        if(file) {
            console.log(file.metadata.name === 'deploy/' + fileName);
        }
    });
}

module.exports.downFile = async function(project, file) {
    const destFileName = '../../' + file;
    const options = {
        destination: destFileName,
    };
    await storage.bucket(project + '.appspot.com').file('deploy/' + file).download(options);
    
}
