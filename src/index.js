const { server } = require('./app');
const port = process.env.PORT || 443;
const startServer = async () => {

    server.listen(8443, () => {
      console.log(`Server is running on port ${8443}`);
    });

};

// Start the server and handle connections and errors
startServer();