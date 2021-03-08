//const video = require('../database/video')
//const addToBlob = require('../storage/addToBlob')
const listVideos = require('../storage/listFiles.js')

/**
 * Scaffold video API
 */
function getAllVideos() {
    console.log(`Returning ALL videos`)
    listVideos()
    return true
}

function getVideo(videoId) {
    console.log(`Returning video ${videoId}`)
    return videoId
}

function downloadVideo(videoId) {
    console.log(`Downloading video ${videoId}`)
    return videoId
}

function insertVideo(videoFile) {
    console.log(videoFile)
    console.log(`Inserting new video`)
    return true
    //return addToBlob.upload(videoFile)
}

function deleteVideo(videoId) {
    console.log(`Deleting video ${videoId}`)
    return true
}

function likeVideo(videoId) {
    console.log(`LIKE video ${videoId}`)
    return true
}

function unlikeVideo(videoId) {
    console.log(`UNLIKE video ${videoId}`)
    return true
}


module.exports.all = getAllVideos
module.exports.get = getVideo
module.exports.download = downloadVideo
module.exports.add = insertVideo
module.exports.delete = deleteVideo
module.exports.like = likeVideo
module.exports.unlike = unlikeVideo