const  express = require('express')


const router = express.Router()

router.get('/', () => console.log('teste'))

module.exports = router;