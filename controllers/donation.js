const Donation = require('../models/dontations');
const { responseHandler } = require('../helper/responseHandler');

exports.createDonation = async (req, res) => {
  try {
    const { ngo, user, amount, donationType } = req.body;
    if (!ngo || !user || !amount || !donationType) {
      return responseHandler(res, 400, null, 'All fields are required: ngo, user, amount, donationType', false);
    }

    const validDonationTypes = ['quick-donation', 'subscription-donation'];
    if (!validDonationTypes.includes(donationType)) {
      return responseHandler(res, 400, null, 'Invalid donation type', false);
    }
    const newDonation = new Donation({
      ngo,
      user,
      amount,
      donationType,
    });
    const savedDonation = await newDonation.save();

    return responseHandler(res, 200, savedDonation, 'Donation created successfully', true);
  } catch (error) {
    console.error('Error while creating donation:', error.message);
  }
};
