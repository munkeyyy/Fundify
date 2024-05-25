import bankModel from "../Models/bank.model";
import fs, { existsSync, unlinkSync } from "fs";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads/sips")) {
      cb(null, "./uploads/sips");
    }
    // } else {
    //   fs.mkdirSync("./uploads/sips");
    //   cb(null, "./uploads/sips");
    // }
  },
  filename: function (req, file, cb) {
    console.log(file);
    const orgname = file.originalname;
    const name = path.parse(orgname).name;
    const ext = path.parse(orgname).ext;
    const unique = Date.now();

    const finalname = name + "-" + unique + ext;

    cb(null, finalname);
  },
});
const upload = multer({ storage: storage })
export const addSip = async (req, res) => {
  try {
    const dataWithImage = upload.single("image");
    dataWithImage(req, res, async function (err) {
      if (err)
        return res.status(400).json({
          message: err.message,
        });
      let img = null;
      if (req.file) {
        img = req.file.filename;
      }
      const { name, riskLevel, description, returns, category } = req.body;
    const createSip = new bankModel({
      name: name,
      riskLevel: riskLevel,
      description: description,
      category:category,
      returns:returns,
      image:img
    });
    await createSip.save();
    if (createSip) {
      return res.status(201).json({
        data: createSip,
        message: "Sip created successfully",
      });
    }
    })
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
    const  sipId  = req.params.sipId;
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
    const dataWithImage = upload.single("image");
    dataWithImage(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      const  sipId  = req.params.sipId;
      const existData = await bankModel.findOne({_id:sipId})
      const { name, riskLevel, description, returns, category } = req.body;
      let existingImg=existData.image
      if (req.file) {
        existingImg = req.file.filename;
        if (fs.existsSync("./uploads/sips/" + existData.image)) {
          fs.unlinkSync("./uploads/sips/" + existData.image);
        }
        console.log("img",existingImg)
      }
      const updateSipData = await bankModel.updateOne(
        { _id: sipId },
        { $set: { name: name, riskLevel: riskLevel, description: description, returns:returns, category:category, image:existingImg } }
      );
      if (updateSipData.acknowledged) {
        return res.status(200).json({
          // data: singleSipData,
          message: "Sip Data Updated Successfully",
        });
      }
      return res.status(400).json({
        message: "Something Went Wrong!!",
      });
    })

   
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteSip = async (req, res) => {
  try {
    const  sipId  = req.params.sipId;
    const existData = await bankModel.findOne({_id:sipId})

    const deleteSipData = await bankModel.deleteOne({ _id: sipId });
    if (deleteSipData.acknowledged) {
      if (fs.existsSync("./uploads/sips/" + existData.image)) {
        fs.unlinkSync("./uploads/sips/" + existData.image);
      }
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
