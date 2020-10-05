const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const routes = require("./routes");
const { db, auth, provider } = require('./firebase')

const app = express();
app.use(routes);
const server = http.createServer(app);
const io = socketIo(server);


// db.collection('tasks').doc('J1NCzXKmZbptXK8nvDDN').onSnapshot(snapchot => (
//     console.log(snapchot.data().description)
// ))

io.on('connect', socket => {

    // Returning the initial data from tasks collection
    socket.on('initial_data', async () => {
        const snapshot = await db.collection('tasks').get()
        data = snapshot.docs.map(doc => ({ id: doc.id, description: doc.data().description }))
        io.emit('get_data', data)
    })

    socket.on('new_task', task => {
        db.collection('tasks').add({ description: task })
        io.emit('change_data')
    })

})



server.listen(port, () => console.log(`Listening on port ${port}`));