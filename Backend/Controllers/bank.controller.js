import bankModel from "../Models/bank.model";

export const addSip = async (req, res) => {
  try {
    const { name, riskLevel, description, returns } = req.body;
    const createSip = new bankModel({
      name: name,
      riskLevel: riskLevel,
      description: description,
      returns:returns
    });
    await createSip.save();
    if (createSip) {
      return res.status(201).json({
        data: createSip,
        message: "Sip created successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSip = async (req, res) => {
  try {
    const sipData = await bankModel.find();
    if (sipData) {
      return res.status(200).json({
        data: sipData,
        message: "Sip DataFetched Successfully!!",
      });
    }
    return res.status(400).json({
      message: "Something Went Wrong!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleSip = async (req, res) => {
  try {
    const { sipId } = req.params.sipId;
    const singleSipData = await bankModel.findOne({ _id: sipId });
    if (singleSipData) {
      return res.status(200).json({
        data: singleSipData,
        message: "Single Sip Data Fetched Successfully",
      });
    }
    return res.status(400).json({
      message: "Something Went Wrong!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateSip = async (req, res) => {
  try {
    const { sipId } = req.params.sipId;
    const { name, riskLevel, description, returns } = req.body;
    const updateSipData = await bankModel.updateOne(
      { _id: sipId },
      { $set: { name: name, riskLevel: riskLevel, description: description, returns:returns } }
    );
    if (updateSipData.acknowledged) {
      return res.status(200).json({
        data: singleSipData,
        message: "Sip Data Updated Successfully",
      });
    }
    return res.status(400).json({
      message: "Something Went Wrong!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteSip = async (req, res) => {
  try {
    const { sipId } = req.params.sipId;
    const deleteSipData = await bankModel.deleteOne({ _id: sipId });
    if (deleteSipData.acknowledged) {
      return res.status(200).json({
        data: deleteSipData,
        message: "Sip Data Deleted Successfully",
      });
    }
    return res.status(400).json({
      message: "Something Went Wrong!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
