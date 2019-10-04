const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    devServer: {
        port: 80,
        contentBase: path.join(__dirname, 'dist'),
        before: function(app, server) {
            app.get('/', function(req, res) {
              res.sendFile(path.join(__dirname, 'dist', 'html', 'index.html'));
            });
        },
        /*{
            '/todolist': {
                target: 'http://its.teknikum.it:8080',
                pathRewrite: function (path, req) { 
                    if(req.method === 'GET'){
                        return path.replace('/todolist', '/lists/2?_embed=items')
                    }
                    else if(req.method === 'POST'){
                        return path.replace('/todolist', '/lists/2/items');
                    }
                }
            },
            '/todolist/items/**': {
                target: 'http://its.teknikum.it:8080',
                pathRewrite: function(path, req){
                    return path.replace('/todolist/items/', '/items/')
                }
            }
        }*/
    }
};