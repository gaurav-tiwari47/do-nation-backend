const Ngo = require("../models/ngos");
const Dal = require("../dal/dal");

exports.totalDonationToNgo = async (query) => {
  return await Dal.aggregate(Ngo, query);
};
