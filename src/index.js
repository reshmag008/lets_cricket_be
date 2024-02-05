const { server } = require('./app');
const port = process.env.PORT || 80;
const startServer = async () => {

    server.listen(80, () => {
      console.log(`Server is running on port ${80}`);
    });

};

// Start the server and handle connections and errors
startServer();