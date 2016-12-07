/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/amphibian', require('./api/amphibian'));
  app.use('/api/animal', require('./api/animal'));
  app.use('/api/bird', require('./api/bird'));
  app.use('/api/contain', require('./api/contain'));
  app.use('/api/event', require('./api/event'));
  app.use('/api/fish', require('./api/fish'));
  app.use('/api/insect', require('./api/insect'));
  app.use('/api/livesIn', require('./api/livesIn'));
  app.use('/api/mammal', require('./api/mammal'));
  app.use('/api/weather', require('./api/weather'));
  app.use('/api/observation', require('./api/observation'));
  app.use('/api/occurrence', require('./api/occurrence'));
  app.use('/api/reptile', require('./api/reptile'));
  app.use('/api/research', require('./api/research'));
  app.use('/api/researcher', require('./api/researcher'));
  app.use('/api/zone', require('./api/zone'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
