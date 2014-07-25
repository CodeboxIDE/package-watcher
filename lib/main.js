var Watcher = require('large-watcher');


module.exports = function(codebox) {
    var events = codebox.events;

    codebox.logger.log("Starting the file watcher");

    codebox.workspace.path()
    .then(function(path) {
        var watcher = Watcher(path, 2);

        // Handle deleted files
        watcher.on('deleted', function(files) {
            codebox.events.emit('watcher:deleted', files);
        });

        // Handle modified files
        watcher.on('modified', function(files) {
            codebox.events.emit('watcher:modified', files);
        });

        codebox.logger.log("File watcher started");
    });

};
