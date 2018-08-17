const nodemon = require('nodemon');

nodemon({
  script: './src/app.js',
  env: {
    PORT: 4000
  },
  ext: 'js, json',
  watch: ['./src', './public'],
  ignore: ['server.js'],
  delay: 1000,
});

nodemon
  .on('start', () => {
	console.log('Started API Server...');
  })
  .on('restart', (files) => {
    console.log('Watcher has detected files have changed. API Server restarted...');
  });

process.once('SIGINT', () => {
  nodemon.once('exit', () => {
    console.log('nodemon has cleanly exited');
    process.exit();
  });
});
