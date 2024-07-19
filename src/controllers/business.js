import Business from '../models/Business.js';
import Creator from '../models/Creator.js';

export const completeProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const profileData = req.body;

    const business = await Business.findByIdAndUpdate(userId, profileData, { new: true });
    if (!business) return res.status(404).json({ status: false, message: 'Business not found' });

    res.status(200).json({ status: true, data: business });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { businessId } = req.params;
    const profileData = req.body;

    profileData.isDoneWithProfile = true;

    const business = await Business.findByIdAndUpdate(businessId, profileData, { new: true });
    if (!business) return res.status(404).json({ status: false, message: 'Business not found' });

    res.status(200).json({ status: true, data: business });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const forYou = async (req, res) => {
  try {
    const businessId = req.params.id;
    
    const business = await Business.findById(businessId);
    
    if (!business) {
      return res.status(404).json({ status: false, message: 'Business not found' });
    }
    
    const creators = await Creator.find();

    const filteredCreators = creators.filter(creator => {
      const equityMatch = creator.preferredEquity === business.equityOffered;
      const nicheMatch = creator.niche === business.industry;
      const engagementMatch = business.goal === 'increase_engagement' && creator.engagementRate.instagram > 5; // Example rate

      return nicheMatch || equityMatch || engagementMatch;
    });

    filteredCreators.sort((a, b) => {
      const followersComparison = b.followers.instagram - a.followers.instagram;
      if (followersComparison !== 0) return followersComparison;

      return b.engagementRate.instagram - a.engagementRate.instagram;
    });

    res.status(200).json({ status: true, data: filteredCreators });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const allCreators = async (req, res) => {
  try {
    const creators = await Creator.find();
    res.status(200).json({ status: true, data: creators });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findById(id).lean();

    if (!business) {
      return res.status(404).json({
        status: false,
        message: 'No business found'
      });
    }

    res.status(200).json({ status: true, data: business });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};