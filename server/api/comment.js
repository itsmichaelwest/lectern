/**
 * Scaffold comment API
 */
function getComments(videoId) {
    console.log(`GET all comments on video ${videoId}`)
    return true
}

function postComment(videoId, body) {
    console.log(`POST comment '${body.comment}' on video ${videoId}`)
    return true
}

function unlikeComment(videoId, commentId) {
    console.log(`UNLIKE comment ${commentId} on video ${videoId}`)
    return true
}

function likeComment(videoId, commentId) {
    console.log(`LIKE comment ${commentId} on video ${videoId}`)
    return true
}

function reportComment(videoId, commentId) {
    console.log(`REPORT comment ${commentId} on video ${videoId}`)
    return true
}

function unreportComment(videoId, commentId) {
    console.log(`REPORT comment ${commentId} on video ${videoId}`)
    return true
}

module.exports.get = getComments
module.exports.post = postComment
module.exports.like = likeComment
module.exports.unlike = unlikeComment
module.exports.report = reportComment
module.exports.unreport = unreportComment