var Watcher = require('large-watcher');


module.exports = function(codebox) {
    var events = codebox.events;

    codebox.logger.log("Starting the file watcher");

    codebox.workspace.path()
    .then(function(path) {
        var watcher = Watcher(path, 2).start();

        // Handle deleted files
        watcher.on('deleted', function(files) {
            codebox.events.emit('fs:deleted', files);
        });

        // Handle modified files
        watcher.on('modified', function(files) {
            codebox.events.emit('fs:modified', files);
        });

        codebox.logger.log("File watcher started");
    });

};
