const { server } = require('./app');
const port = process.env.PORT || 80;
const startServer = async () => {

    server.listen(3000, () => {
      console.log(`Server is running on port ${3000}`);
    });

};

// Start the server and handle connections and errors
startServer();