const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { application, json } = require('express')
const contactmodel = require('../models/contact.model')
const addproduct = require('../models/product')
const achitecture_categry = require('../models/architecture.categry.model')
const interior_categry = require('../models/interior.categry.model')
const achitecture = require('../models/architecture.model')
const interior = require('../models/interior.model')
const awards = require('../models/about.model')
const replytoclient = require('../models/reply.client.model')
const admin = require('../models/admin.model')
const crouselproduct = require('../models/crousel.model')

// exports.registeradmin = async (req, res) => {
//     // console.log(req.body)
//     try {
//         const {email, password } = req.body
//         const record = new admin({
//             Email: email,
//             Password:password
//         })
//         await record.save()
//         res.json({
//             message: "sucessfuly register",
//             statuscode: 202,
//             data: record
//         })
//         console.log(record)
//     }
//     catch (error) {
//         res.json({
//             message: `page not found / error in registeradmin api ${error}`,
//             statuscode: 404,
//             data: null
//         })
//     }
// }
// exports.findadmin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const record = await admin.findOne({ Email: email, Password: password });

//         if (record) {
//             res.json({
//                 message: "Login successful",
//                 statuscode: 202,
//                 data: record,
//             });
//         } else {
//             res.json({
//                 message: "Invalid email or password",
//                 statuscode: 401,
//                 data: null,
//             });
//         }
//     } catch (error) {
//         res.json({
//             message: `Error in findadmin API: ${error}`,
//             statuscode: 404,
//             data: null,
//         });
//     }
// };




exports.findadmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const record = await admin.findOne({ Email: email });

        if (!record) {
            return res.status(401).json({
                message: 'Invalid email or password',
                statuscode: 401,
                data: null,
            });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, record.Password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password',
                statuscode: 401,
                data: null,
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: record._id, email: record.Email }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration
        });

        res.json({
            message: 'Login successful',
            statuscode: 202,
            token, // Send the token to the frontend
            data: record,
        });
    } catch (error) {
        res.json({
            message: `Error in findadmin API: ${error}`,
            statuscode: 404,
            data: null,
        });
    }
};

// Register API (for hashing password)
exports.registeradmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const record = new admin({
            Email: email,
            Password: hashedPassword,
        });

        await record.save();

        res.json({
            message: 'Successfully registered',
            statuscode: 202,
            data: record,
        });
    } catch (error) {
        res.json({
            message: `Error in registeradmin API: ${error}`,
            statuscode: 404,
            data: null,
        });
    }
};
exports.login = async(req, res) => { 
    try{
    const {email, password} = req.body
    
    const emailcheack = await admin.findOne({Email:email})
    const passCheack =await bcrypt.compare(password, emailcheack.password)
    if(emailcheack !== null){
      if(passCheack ){
       res.json({
          message:"succesfully login",
          statusCode:404,
          data:emailcheack,
        })

    }  
    else{
      res.json({
        message:"wrong email or password",
        statusCode:404,
        data:null
     })
        
  }
  }
   else{
      res.json({
        message:"wrong email or password",
        statusCode:404,
        data:null
     })
        
  }

 }
  catch(error){         
    res.json({
       message:`page is note found ${error}`,
       statusCode:404,
       data:null
    })
    }
  }


exports.contactus = async (req, res) => {
    console.log(req.body)
    try {
        const { name, subject, email, message } = req.body
        const record = new contactmodel({
            Name: name,
            Email: email,
            Subject: subject,
            Message: message
        })
        await record.save()
        res.json({
            message: "sucessfuly sign-up",
            statuscode: 202,
            data: record
        })
        console.log(record)
    }
    catch (error) {
        res.json({
            message: `page not found / error in signup api ${error}`,
            statuscode: 404,
            data: null
        })
    }
}


exports.product = (req, res) => {
    console.log(req.body)
    try {
        const { productname, prise, disc, img } = req.body
        // const img = req.file.filename
        const record = new addproduct({
            Productname: productname,
            Prise: prise,
            Disc: disc,
            Img: img
        })
        record.save()
        res.json({
            message: "sucessfuly sign-up",
            statuscode: 202,
            data: record
        })
        console.log(record)
    }
    catch (error) {
        res.json({
            message: `page not found / error in signup api ${error}`,
            statuscode: 404,
            data: null
        })
    }
}


exports.findcontact = async (req, res) => {
    try {
        const record = await contactmodel.find();
        res.json({
            message: "Users found",
            statuscode: 202,
            data: record
        });
    } catch (error) {
        res.json({
            message: `Users not found: ${error}`,
            statuscode: 404,
            data: null
        });
    }
};



exports.deletecontact = async (req, res) => {
    console.log(req.params.id)
    try {
        const id = req.params.id
        const record = await contactmodel.findByIdAndDelete(id);
        res.json({
            message: "deleted",
            statuscode: 202,
            data: record
        })
    } catch (error) {
        res.json({
            message: `error in deletesignup api / ${error}`,
            statuscode: 404,
            data: null
        })
    }

}


exports.add_architecture_category = async (req, res) => {
    console.log(req.body)
    try {
        const { name} = req.body
        const record = new achitecture_categry({
            Name: name,
           
        })
        await record.save()
        res.json({
            message: "categry sucessfuly added",
            statuscode: 202,
            data: record
        })
        console.log(record)
    }
    catch (error) {
        res.json({
            message: `error in add_architecture_category api ${error}`,
            statuscode: 404,
            data: null
        })
    }
}

exports.find_architecture_category = async (req, res) => {
    try {
        const record = await achitecture_categry.find();
        res.json({
            message: "Users found",
            statuscode: 202,
            data: record
        });
    } catch (error) {
        res.json({
            message: `Users not found: ${error}`,
            statuscode: 404,
            data: null
        });
    }
};




exports.add_interior_categry = async (req, res) => {
    console.log(req.body)
    try {
        const { name} = req.body
        const record = new interior_categry({
            Name: name,
           
        })
        await record.save()
        res.json({
            message: "categry sucessfuly added",
            statuscode: 202,
            data: record
        })
        console.log(record)
    }
    catch (error) {
        res.json({
            message: `error in add_architecture_category api ${error}`,
            statuscode: 404,
            data: null
        })
    }
}

exports.find_interior_categry = async (req, res) => {
    try {
        const record = await interior_categry.find();
        res.json({
            message: "Users found",
            statuscode: 202,
            data: record
        });
    } catch (error) {
        res.json({
            message: `Users not found: ${error}`,
            statuscode: 404,
            data: null
        });
    }
};

exports.add_achitecture = async (req, res) => {
    console.log(req.body)
    try {
        const { location, Category ,projectname } = req.body
        const img = req.file.filename
        const record = new achitecture({
            Category: Category ,
            img: img,
            Location: location,
            Projectname: projectname
            
        })
        await record.save()
        res.json({
            message:`sucessfuly added`,
            statuscode: 202,
            data: record
        })
        console.log(record)
    }
    catch (error) {
        res.json({
            message: `page not found / error in add_achitecture api ${error}`,
            statuscode: 404,
            data: null
        })
    }
}

exports.add_interior = async (req, res) => {
    console.log(req.body)
    try {
        const { location, Category ,projectname } = req.body
        const img = req.file.filename
        const record = new interior({
            Category: Category ,
            img: img,
            Location: location,
            Projectname: projectname
            
        })
        await record.save()
        res.json({
            message:`sucessfuly added`,
            statuscode: 202,
            data: record
        })
        console.log(record)
    }
    catch (error) {
        res.json({
            message: `page not found / error in add_achitecture api ${error}`,
            statuscode: 404,
            data: null
        })
    }
}









// exports.find_architecture = async (req, res) => {
//     try {
//         const record = await achitecture.find();
//         res.json({
//             message: "Users found",
//             statuscode: 202,
//             data: record
//         });
//     } catch (error) {
//         res.json({
//             message: `Users not found: ${error}`,
//             statuscode: 404,
//             data: null
//         });
//     }
// };


exports.find_architecture= async (req, res) => {
    try {
        const record = await achitecture.find();
        res.json({
            message: "Users found",
            statuscode: 202,
            data: record
        });
    } catch (error) {
        res.json({
            message: `Users not found: ${error}`,
            statuscode: 404,
            data: null
        });
    }
};



exports.find_interior= async (req, res) => {
    try {
        const record = await interior.find();
        res.json({
            message: "Users found",
            statuscode: 202,
            data: record
        });
    } catch (error) {
        res.json({
            message: `Users not found: ${error}`,
            statuscode: 404,
            data: null
        });
    }
};







exports.add_awards = async (req, res) => {
    try {
        const { awardsname, year, place, location } = req.body; // Match frontend key names
        const img = req.file.filename; // Ensure file upload is correctly handled
        const record = new awards({
            Year: year,
            Awardsname: awardsname, // Match the schema key
            Img: img,
            Place: place,
            Location: location,
        });
        await record.save();
        res.json({
            message: "Awards successfully added",
            statuscode: 202,
            data: record,
        });
    } catch (error) {
        res.json({
            message: `Error in add_awards API: ${error}`,
            statuscode: 404,
            data: null,
        });
    }
};


exports.find_awards= async (req, res) => {
    try {
        const record = await awards.find();
        res.json({
            message: "awards found",
            statuscode: 202,
            data: record
        });
    } catch (error) {
        res.json({
            message: `awards not found: ${error}`,
            statuscode: 404,
            data: null
        });
    }
};




exports.replytoclient = async(req, res)=> {
    console.log(req.body)
    try {
        const { awardname,year,img,place,location}= req.body
        const record = new replytoclient({
            Email:String,
            Sublect:String,
            Message:String,        
           
        })
        await record.save()
        res.json({
            message: " sucessfuly added",
            statuscode: 202,
            data: record
        })
        console.log(record)
    }
    catch (error) {
        res.json({
            message: `error in replytoclient api ${error}`,
            statuscode: 404,
            data: null
        })
    }
}

exports.findreplytoclient= async (req, res) => {
    console.log(req.body)
    const id =req.params.id
    const record = await contactmodel.findById(id);
    res.json(record)
};




exports.find_architecture = async (req, res) => {
    try {
        const record = await achitecture.find();
        res.json({
            message: "Users found",
            statuscode: 202,
            data: record
        });
    } catch (error) {
        res.json({
            message: `Users not found: ${error}`,
            statuscode: 404,
            data: null
        });
    }
};


//crouser 
exports.addcrouselproduct = async(req, res) => {   
    try{
      const {name,} = req.body
      const img = req.file.filename
      
      const record = new crouselproduct({
         
        img:img
      })
      await record.save()
      // console.log(record)
      res.json({
        data:record,
        message:"sucsessfully add product",
      })
    }
      catch(error){
          res.json({
             message:`produt not found${error}`,
             statusCode:404,
             data:null
          })
          }
        }
    exports.getcrouselproduct = async(req, res) => { 
      const record= await crouselproduct.find()
      res.json({
        data:record,
        message:"sucsessfully get product",
      })
  
  
    }
    exports.deletereg = async(req, res) => { 
      const id = req.params.id
      const record = await crouselproduct.findByIdAndDelete(id)
      res.json({
        data:record,
        message:"sucsessfully delete product",
      })
    }









