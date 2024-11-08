const Admin = require('./../../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {responseHandler} = require('./../../helper/responseHandler')

exports.register = async(req,res,next) => {
  try {
    const {fullName,email,password} = req.body;
    const adminExist = await Admin.findOne({email});
    if(adminExist) {
      return responseHandler(res,409,email,'User with this email already exist')
    }
    const hashedPassword = await bcrypt.hash(password,6)
    const admin = await Admin.create({fullName,email,password:hashedPassword})
    const payLoad = {
      email:admin.email,
      fullName:admin.fullName
    }
    let token = jwt.sign(payLoad,'saurav',{expiresIn : '3d'})
    return responseHandler(res,200,{payLoad,token},'Admin registered successfully')
  } catch (error) {
    console.log('Error occured while registering user',error)
    return res.status(500).json({
      success:true,
      message:error.message
    })
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return responseHandler(res, 404, null, 'User with this email does not exist', false);
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return responseHandler(res, 401, null, 'Incorrect password', false);
    }
    const payLoad = {
      email: admin.email,
      fullName: admin.fullName,
    };
    const token = jwt.sign(payLoad, 'saurav', { expiresIn: '3d' });

    // Send success response with token
    return responseHandler(res, 200, { payLoad, token }, 'Login successful', true);

  } catch (error) {
    console.log('Error occurred during login:', error);
    return responseHandler(res, 500, null, error.message, false);
  }
};