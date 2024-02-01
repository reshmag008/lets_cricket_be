const { server } = require('./app');

const startServer = async () => {

    server.listen(443, () => {
      console.log(`Server is running on port ${443}`);
    });


};

// Start the server and handle connections and errors
startServer();