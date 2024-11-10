const Ngo = require("./../models/ngos");
const { responseHandler } = require("./../helper/responseHandler");
const Client = require('../models/clients')
const Query = require('../query/ngo')
const Service = require('../services/ngo')

exports.addNgo = async (req, res) => {
  try {
    const {client, title, description } = req.body;
    if (!title || !description) {
      return responseHandler(res, 400, null, "Enter all fields", false);
    }
    const ngo = await Ngo.create({client,title,description});
    await Client.findByIdAndUpdate(
      client,
      {$push:{ngoName:ngo._id}},
      {new: true}
    )
    return responseHandler(res,200,ngo,'Ngo successfully added',true)
  } catch (error) {
    console.log('Error while adding NGo',error.message)
  }
};

exports.verifyNgo = async (req, res) => {
  try {
    const { ngoId, ngoStatus } = req.body;

    const ngo = await Ngo.findOne({ _id:ngoId });
    if (!ngo) {
      return responseHandler(res, 404, null, 'Unable to find NGO with this ID', false);
    }
    const updateNgo = await Ngo.findByIdAndUpdate(
      { _id:ngoId },
      { ngoStatus },
      { new: true }
    );
    return responseHandler(res, 200, updateNgo, 'Successfully verified the NGO', true);
  } catch (error) { 
    console.error('Error while verifying the NGO:', error.message);
    return responseHandler(res, 500, null, 'An error occurred while verifying the NGO', false);
  }
};

exports.totalDonation = async(req,res) => {
  try {
    const {ngoid} = req.params;
    const query = Query.totalDontationNgo(ngoid);
    const data = await Service.totalDonationToNgo(query)
    if(!data) responseHandler(res,401,null,'Unable to find totalDonation',false);
    return responseHandler(res,200,data[0],'Total donation fetched successfully',true)
  } catch (error) {
    console.log('error while fectching total dontation ngo : ',error.message)
    return;
  }
}