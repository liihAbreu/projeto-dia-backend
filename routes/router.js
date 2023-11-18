const express = require('express');
const router = express();

router.use('/api/users', require('./userRoutes'));
router.use('/api/clients', require('./clientRoutes'));
router.use('/api/services', require('./servicesClints'));
router.use('/api/historic', require('./historicRoutes'));

// test route
router.get('/', (req, res) => {
  res.send('Api working!');
});

module.exports = router;
