const { server } = require('./app');
const port = process.env.PORT || 80;
const startServer = async () => {

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

};

// Start the server and handle connections and errors
startServer();