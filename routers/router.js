const router = require("express").Router();
const cApi = require('../controlers/controler');
const multer = require('multer');
const path = require('path');


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../public/uploads'); 
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); 
//     }
// });

// let upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 * 5 } 
// });


const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
    limits: { fileSize: 1024 * 1024 * 20 },
  });



router.post('/registeradmin', cApi.registeradmin);

router.post('/contactus', cApi.contactus);
router.get('/findcontact', cApi.findcontact);
router.delete('/deletecontact/:id', cApi.deletecontact);
router.post('/add_architecture_category',cApi.add_architecture_category);
router.get('/find_architecture_category',cApi.find_architecture_category);
router.post('/add_interior_categry',cApi.add_interior_categry);
router.get('/find_interior_categry',cApi.find_interior_categry);
router.post('/add_achitecture',upload.single('img'),cApi.add_achitecture);

router.get('/find_architecture',cApi.find_architecture);
router.get('/find_interior',cApi.find_interior);
router.get('/find_awards',cApi.find_awards);
router.post('/add_awards',upload.single('img'),cApi.add_awards);
router.post('/replytoclient',cApi.replytoclient);
router.get('/findreplytoclient',cApi.findreplytoclient);

module.exports = router;

