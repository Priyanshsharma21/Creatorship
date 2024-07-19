import mongoose from 'mongoose'

const { Schema, model } = mongoose

const businessSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: {
      city: { type: String },
      country: { type: String }
    },
    userType : {
      type: String, required: true
    },
    companyName: { type: String },
    contactPersonName: { type: String },
    contactNumber: { type: String },
    website: { type: String },
    industry: { type: String }, 
    companySize: { type: Number }, 
    foundedYear: { type: Number },
    partnershipGoals: [String], 
    equityOffered: { type: String }, 
    expectedDeliverables: [String],
    budget: { type: String },
    previousPartnerships: [String],
    aboutUs: { type: String },
    socialMediaLinks: {
      facebook: { type: String },
      linkedin: { type: String },
      instagram: { type: String }
    },
    keyProducts: [String],
    targetAudience: { type: String },
    isDoneWithProfile : {type: Boolean}
  }, { timestamps: true });


const Business = model('Business', businessSchema);

export default Business