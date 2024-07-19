import mongoose from 'mongoose'

const { Schema, model } = mongoose

const creatorSchema = new Schema({
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
    socialMediaHandles: {
      youtube: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      linkedin: { type: String }
    },
    followers: {
      youtube: { type: Number },
      instagram: { type: Number },
      twitter: { type: Number },
      linkedin: { type: Number }
    },
    engagementRate: {
      youtube: { type: Number },
      instagram: { type: Number },
      twitter: { type: Number },
      linkedin: { type: Number }
    },
    niche: { type: String }, 
    contentType: { type: String }, 
    portfolioLinks: [String],
    bio: { type: String },
    availability: { type: String }, 
    partnershipTypes: [String], 
    previousPartnerships: [String],
    preferredEquity: { type: String }, 
    additionalSkills: [String], 
    isDoneWithProfile : {type: Boolean}
  }, { timestamps: true });
  
const Creator = model('Creator', creatorSchema);

export default Creator
