require('dotenv').config()

const app = require('./app')

// Server
app.listen(8080, () => {
    console.log('Server is available on PORT: ' + 8080)
})
