const app = require('express')();
const port = process.env.PORT ||8080;

const server = app.listen(
    port,
    () => console.log('server open on ' + port)
)

app.get('/', (req, res) => {

    res.status(200).send('hello user')
})

module.exports = server;