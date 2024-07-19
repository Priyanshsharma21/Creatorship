import Business from '../models/Business.js';
import Creator from '../models/Creator.js';

export const completeProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const profileData = req.body;

    const creator = await Creator.findByIdAndUpdate(userId, profileData, { new: true });
    if (!creator) return res.status(404).json({ status: false, message: 'Creator not found' });

    res.status(200).json({ status: true, data: creator });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { creatorId } = req.params;
    const profileData = req.body;

    profileData.isDoneWithProfile = true;

    const creator = await Creator.findByIdAndUpdate(creatorId, profileData, { new: true });
    if (!creator) return res.status(404).json({ status: false, message: 'Creator not found' });

    res.status(200).json({ status: true, data: creator });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const forYou = async (req, res) => {
  try {
    const creatorId = req.params.id;
    
    const creator = await Creator.findById(creatorId);
    
    if (!creator) {
      return res.status(404).json({ status: false, message: 'Creator not found' });
    }
    
    const businesses = await Business.find();

    const filteredBusinesses = businesses.filter(business => {
      const equityMatch = business.equityOffered === creator.preferredEquity;
      const nicheMatch = business.industry === creator.niche;
      const engagementMatch = business.goal === 'increase_engagement' && creator.engagementRate.instagram > 5; // Example rate

      return nicheMatch || equityMatch || engagementMatch;
    });

    filteredBusinesses.sort((a, b) => {
      const followersComparison = b.followers.instagram - a.followers.instagram;
      if (followersComparison !== 0) return followersComparison;

      return b.engagementRate.instagram - a.engagementRate.instagram;
    });

    res.status(200).json({ status: true, data: filteredBusinesses });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};



export const allBusiness = async (req, res) => {
  try {
    const business = await Business.find();
    res.status(200).json({ status: true, data: business });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getCreatorById = async (req, res) => {
  try {
    const { id } = req.params
    const creator = await Creator.findById(id).lean();

    if (!creator) return res.status(404).json({
      status: false,
      message: 'no creator found'
    })

    res.status(200).json({ status: true, data: creator });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};