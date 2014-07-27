var Watcher = require('large-watcher');


module.exports = function(codebox) {
    var events = codebox.events;

    codebox.logger.log("Starting the file watcher");

    var watcher = Watcher(codebox.workspace.root(), 2).start();

    // Handle deleted files
    watcher.on('deleted', function(files) {
        codebox.events.emit('fs:deleted', files);
    });

    // Handle modified files
    watcher.on('modified', function(files) {
        codebox.events.emit('fs:modified', files);
    });

    // Handle created files
    watcher.on('created', function(files) {
        codebox.events.emit('fs:created', files);
    });

    // Handler errors
    watcher.on('error', function(err) {
        codebox.logger.error(err);
    });

    codebox.logger.log("File watcher started");
};
