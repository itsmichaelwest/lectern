/**
 * Scaffold video API
 */
function getAllVideos() {
    console.log(`Returning ALL videos`)
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

function insertVideo() {
    console.log(`Inserting new video`)
    return true
}

function deleteVideo(videoId) {
    console.log(`Deleting video ${videoId}`)
    return true
}

module.exports.all = getAllVideos
module.exports.get = getVideo
module.exports.download = downloadVideo
module.exports.insert = insertVideo
module.exports.delete = deleteVideo