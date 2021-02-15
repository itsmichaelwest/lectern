var ffmpeg = require('fluent-ffmpeg')
var fs = require('fs')
var command = ffmpeg()

function transcodeMP4() {
    var stream  = fs.createWriteStream('./video/outputfile.avi');

    command
        .input(fs.createReadStream('./video/video.mp4'))
        .inputFormat('mp4')
        .noAudio()
        .size('?x1080')
        .output('outputfile.avi')
        .outputFormat('avi')
        .output(stream)
        .on('end', function() {
            console.log('Finished processing');
        })
        .run()

    stream.close()
}

module.exports = {
    transcodeMP4
}