// Generates a video thumbnail by creating a canvas element, drawing the video
// element inside of it and then capturing that canvas as an image data URL.
export default function createThumbnail(videoElement) {
    const canvas = document.createElement('canvas')
    canvas.width = videoElement.videoWidth
    canvas.height = videoElement.videoHeight
    canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height)

    const thumbnail = new Image()
    thumbnail.src = canvas.toDataURL()

    return thumbnail
}