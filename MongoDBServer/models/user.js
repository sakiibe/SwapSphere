const mongoose = require("mongoose");
const defaultprofilephoto =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fvector%2Fdefault-avatar-profile-icon-vector-gm1337144146-418137046&psig=AOvVaw3lxDhjpYtNl-sP6_zM_5ns&ust=1690366055760000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPimo9nPqYADFQAAAAAdAAAAABAE";

const user = new mongoose.Schema({
  userProfilePhoto: {
    type: String,
    default: defaultprofilephoto,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "user",
  },
  NoOfTimesUserReported: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", user);
