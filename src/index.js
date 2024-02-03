const { server } = require('./app');

const startServer = async () => {

    server.listen(80, () => {
      console.log(`Server is running on port ${80}`);
    });
    const exitHandler = async () => {
        if (server) {
          server.close(() => {
            console.log('Server closed');
            process.exit(1);
          });
        } else {
          process.exit(1);
        }
      };
    
      // Error handler for uncaught exceptions
      const unexpectedErrorHandler = (error) => {
        console.log(error);
        exitHandler();
      };
    
      // Handle uncaught exceptions and unhandled rejections
      process.on('uncaughtException', unexpectedErrorHandler);
      process.on('unhandledRejection', unexpectedErrorHandler);
    
      // Handle SIGTERM signal
      process.on('SIGTERM', () => {
        console.log('SIGTERM received');
        if (server) {
          server.close();
        }
      });


};

// Start the server and handle connections and errors
startServer();