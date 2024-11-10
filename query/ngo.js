const mongoose = require('mongoose')
exports.totalDontationNgo = (ngoId) => {
  console.log("NGOID ==> ", ngoId);
  const query = [
    {
      "$match": {
        "_id": new mongoose.Types.ObjectId("672f3054c14b1a9ffc71e83b")
      }
    },
    {
      "$lookup": {
        "from": "donations",
        "localField": "donations",
        "foreignField": "_id",
        "as": "donationDetails"
      }
    },
    {
      "$addFields": {
        "totalDonationAmount": {
          "$sum": {
            "$map": {
              "input": "$donationDetails",
              "as": "donation",
              "in": { "$toInt": "$$donation.amount" } 
            }
          }
        }
      }
    },
    {
      "$project": {
        "donations": 1,
        "donationDetails": 1,
        "totalDonationAmount": 1
      }
    }
  ]
  
  return query
};
