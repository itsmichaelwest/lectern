const video = require('../database/video')

/**
 * Scaffold video API
 */
function getAllVideos() {
    console.log(`Returning ALL videos`)
    return video.getAllVideos()
}

function getVideo(videoId) {
    console.log(`Returning video ${videoId}`)
    return videoId
}

function downloadVideo(videoId) {
    console.log(`Downloading video ${videoId}`)
    return videoId
}

function insertVideo() {
    console.log(`Inserting new video`)
    return true
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
module.exports.insert = insertVideo
module.exports.delete = deleteVideo
module.exports.like = likeVideo
module.exports.unlike = unlikeVideo