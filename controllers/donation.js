const Donation = require('../models/dontations');
const Ngo = require('../models/ngos');
const User = require('../models/user');
const { responseHandler } = require('../helper/responseHandler');

function generateDonationId(donationType) {
  const prefix = donationType === 'quick-donation' ? 'QD' : 'SD';
  const year = new Date().getFullYear().toString().slice(-2);
  const randomFourDigits = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${year}-00${randomFourDigits}`;
}

exports.getDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Donation id ==> ',id)
    if (!id) {
      return responseHandler(res, 400, null, 'Donation ID is required', false);
    }
    const donation = await Donation.findById(id);
    if (!donation) {
      return responseHandler(res, 404, null, 'Donation not found', false);
    }
    return responseHandler(res, 200, donation, 'Donation fetched successfully', true);
  } catch (error) {
    console.log('Error while fetching donation by ID:', error.message);
    return responseHandler(res, 500, null, 'An error occurred while fetching the donation', false);
  }
};

exports.getDonationByUser = async(req,res) => {
  try {
    const {user} = req.params;
    console.log('User ==>',typeof(user));
    if(!user) return responseHandler(res, 400, null, 'User ID is required', false);
    const donation = await Donation.findOne({user});
    if (!donation) {
      return responseHandler(res, 404, null, 'Donation not found by this user', false);
    }
    return responseHandler(res, 200, donation, 'Donation fetched successfully', true);
  } catch (error) {
    console.log('Error while fetching donation by ID:', error.message);
    return responseHandler(res, 500, null, 'An error occurred while fetching the donation', false);
  }
}

exports.createDonation = async (req, res) => {
  try {
    const { ngo, user, amount, donationType } = req.body;
    
    // Validate required fields
    if (!ngo || !user || !amount || !donationType) {
      return responseHandler(res, 400, null, 'All fields are required: ngo, user, amount, donationType', false);
    }

    const validDonationTypes = ['quick-donation', 'subscription-donation'];
    if (!validDonationTypes.includes(donationType)) {
      return responseHandler(res, 400, null, 'Invalid donation type', false);
    }
    const transactionId = generateDonationId(donationType)
    const newDonation = new Donation({
      ngo,
      user,
      amount,
      transactionId:transactionId,
      donationType,
    });
    const savedDonation = await newDonation.save();
    //Update the user document with new donation ID
    await User.findByIdAndUpdate(
      user,
      {$push : {donations:savedDonation._id}},
      {new: true}
    )

    // Update the ngo document with the new donation ID
    await Ngo.findByIdAndUpdate(
      ngo,
      { $push: { donations: savedDonation._id } },
      { new: true }
    );

    // Respond with the saved donation
    return responseHandler(res, 201, savedDonation, 'Donation created and NGO updated successfully', true);
  } catch (error) {
    console.error('Error while creating donation:', error.message);
    return responseHandler(res, 500, null, 'An error occurred while creating the donation', false);
  }
};

