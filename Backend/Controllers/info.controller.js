import bankModel from "../Models/bank.model";
import infoModel from "../Models/info.model";

// Subscribe SIP
export const subscribeSip = async (req, res) => {
  try {
    const { user, sip, amount, startDate, nextPaymentDate } = req.body;

    // Check if the SIP exists
    const existingSip = await bankModel.findById(sip);
    if (!existingSip) {
      return res.status(404).json({ msg: 'SIP not found' });
    }

    // Check if the user already has this SIP
    const userSips = await infoModel.findOne({ user: user, sip: sip });
    if (userSips) {
      return res.status(400).json({ msg: 'User already subscribed to this SIP' });
    }

    const userSip = new infoModel({
      user: user,
      sip: sip,
      amount: amount,
      startDate: startDate,
      nextPaymentDate: nextPaymentDate,
    });

    await userSip.save();
    return res.status(201).json({
      data: userSip,
      message: "SIP subscribed successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get User SIPs
export const getUserSip = async (req, res) => {
  try {
    const pipeLine = [
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "banks",
          localField: "sip",
          foreignField: "_id",
          as: "sip",
        },
      },
      { $unwind: "$sip" },
    ];

    const userSip = await infoModel.aggregate(pipeLine);
    if (userSip) {
      return res.status(200).json({
        data: userSip,
        message: "Users' SIPs fetched successfully",
      });
    }
    return res.status(400).json({
      message: "Something went wrong",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single User SIP
export const getSingleUserSip = async (req, res) => {
  try {
    const { userSipId } = req.params; // Correct destructuring
    const singleUserSip = await infoModel
      .findOne({ _id: userSipId })
      .populate("user")
      .populate("sip");
    if (singleUserSip) {
      return res.status(200).json({
        data: singleUserSip,
        message: "Single SIP fetched successfully",
      });
    }
    return res.status(400).json({
      message: "Something went wrong",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update User SIP
export const updateUserSip = async (req, res) => {
  try {
    const { userSipId } = req.params; // Correct destructuring
    const { user, sip, amount, startDate, nextPaymentDate } = req.body;

    // Check if the SIP exists
    const existingSip = await infoModel.findOne({ _id: userSipId, user: user });
    if (!existingSip) {
      return res.status(404).json({ msg: 'SIP not found or not owned by the user' });
    }

    const update = await infoModel.updateOne(
      { _id: userSipId },
      { $set: { user: user, sip: sip, amount: amount, startDate: startDate, nextPaymentDate: nextPaymentDate } }
    );

    if (update.acknowledged) {
      return res.status(200).json({
        data: update,
        message: "User SIP updated successfully",
      });
    }
    return res.status(400).json({
      message: "Something went wrong",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User SIP
export const deleteUserSip = async (req, res) => {
  try {
    const { userSipId } = req.params;
    const { user } = req.body;

    // Check if the SIP exists and is owned by the user
    const existingSip = await infoModel.findOne({ _id: userSipId, user: user });
    if (!existingSip) {
      return res.status(404).json({ msg: 'SIP not found or not owned by the user' });
    }

    const deletedSip = await infoModel.deleteOne({ _id: userSipId });
    if (deletedSip.acknowledged) {
      return res.status(200).json({
        message: "User SIP deleted successfully",
      });
    }
    return res.status(400).json({
      message: "Something went wrong",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
