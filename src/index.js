const { server } = require('./app');
const port = process.env.PORT || 443;
const startServer = async () => {

    server.listen(port, () => {
      console.log(`Server is running on port ${443}`);
    });

};

// Start the server and handle connections and errors
startServer();