const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        before: function(app, server) {
            app.get('/', function(req, res) {
              res.sendFile(path.join(__dirname, 'dist', 'html', 'index.html'));
            });
        }
    }
};