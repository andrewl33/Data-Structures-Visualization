import * as express from 'express';
import * as path from 'path';

const PORT: number = 37539;

const app = express();

// set port
app.set('port', PORT);

// serve static files
app.use('/public', express.static(path.join(__dirname, '..', 'build')));
// app.use('/files', express.static(path.join(__dirname, '..', 'client', 'ts', 'ds', 'adt-files')));


// handle routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'front-page.html'));
});

app.get('/stack', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'stack.html'));
});

app.get('/binary-tree', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'binary-tree.html'));
});

app.get('/avl-tree', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'avl-tree.html'));
});

// downloads
app.get('/files/stack', (req, res) => {
  const file = path.join(__dirname, '..', 'client', 'ts', 'ds', 'Stack.ts');
  res.download(file);
})

app.get('/files/binary-tree', (req, res) => {
  const file = path.join(__dirname, '..', 'client', 'ts', 'ds', 'BinarySearchTree.ts');
  res.download(file);
})

// error checking

app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found'); 
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

// start
app.listen(app.get('port'), () => {
  console.log('express has started on port:' + PORT);
});