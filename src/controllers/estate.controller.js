import Estate from "../models/Estate.js";
import User from "../models/User.js";
import Role from "../models/Role.js";
import fs from "fs-extra";
import {destroy, upload} from "../helper/imageUpload.js";

// Get all public estates
const allPublicEstates = async (req, res) => {
  try {
    const estates = await Estate.find();
    res.status(200).json(estates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get all user estates
const allUserEstates = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const userEstates = await Estate.find({
      "contact.email": { $in: user.email },
    });
    res.status(200).json(userEstates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get estate by id
const findEstate = async (req, res) => {
  const id = req.params.id;
  try {
    const estate = await Estate.findById(id);
    res.status(200).json(estate);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// Create estate
const createEstate = async (req, res) => {
  const {
    name,
    description,
    price,
    estate_type,
    estate_status,
    areas,
    equipped,
    terrain,
    preserved,
    service_room,
    rooms,
    floors,
    parking,
    construction,
    old_estate,
    bathrooms,
    maintenance,
    coordinates,
  } = req.body;
  try {
    const user = await User.findById(req.userId);
    const uploader = async (path) => uploads(path, "AxioWeb");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const newEstate = new Estate({
      name,
      description,
      price,
      estate_type,
      estate_status,
      imgs: urls,
      areas,
      equipped,
      details: {
        terrain,
        preserved,
        service_room,
        rooms,
        floors,
        parking,
        construction,
        old_estate,
        bathrooms,
        maintenance,
      },
      location: {
        coordinates,
      },
      contact: {
        username: user.username,
        email: user.email,
      },
    });
    await Estate.create(newEstate);
    res.status(201).json({ message: "Estate created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Update estate by id
const updateEstate = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    description,
    price,
    estate_type,
    estate_status,
    areas,
    equipped,
    terrain,
    preserved,
    service_room,
    rooms,
    floors,
    parking,
    construction,
    old_estate,
    bathrooms,
    maintenance,
    coordinates,
    type,
  } = req.body;
  try {
    const data = await Estate.findById(id);
    // Destroy imgs
    const images = data.imgs;
    for (const image of images) {
      const id_media = image.id_media;
    destroys(id_media);
    }
    // Upload imgs
    const uploader = async (path) => uploads(path, "AxioWeb");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const newEstate = new Estate({
      _id: id,
      name: name,
      description: description,
      price: price,
      estate_type: estate_type,
      estate_status: estate_status,
      imgs: urls,
      areas: areas,
      equipped: equipped,
      details: {
        terrain: terrain,
        preserved: preserved,
        service_room: service_room,
        rooms: rooms,
        floors: floors,
        parking: parking,
        construction: construction,
        old_estate: old_estate,
        bathrooms: bathrooms,
        maintenance: maintenance,
      },
      location: {
        type: type,
        coordinates: coordinates,
      },
      contact: {
        username: data.contact.username,
        email: data.contact.email,
      },
    });
    await Estate.findByIdAndUpdate(id, newEstate);
    res.status(200).json({ message: "Estate updated successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// Update estate status
const updateEstateStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const estate = await Estate.findById(id);
    if (!estate) {
      res.status(404).json({ message: "This estate does not exist" });
    }
    if (estate.status === "SALE") {
      await Estate.updateOne({ id }, { status: "SOLD" });
      res.status(200).json({ message: "Estate sold successfully" });
    } else {
      await Estate.updateOne({ id }, { status: "SALE" });
      res.status(200).json({ message: "Estate for sale again" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Delete estate by id
const deleteEstate = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        const data = await Estate.findById(id);
        const images = data.imgs;
        for (const image of images) {
          const id_media = image.id_media;
        destroys(id_media);
        }
        await data.remove();
        res.status(200).json({ message: "Estate deleted successfully" });
      }
    }
    res.status(403).json({ message: "Require Admin Role!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  allPublicEstates,
  allUserEstates,
  findEstate,
  createEstate,
  updateEstate,
  updateEstateStatus,
  deleteEstate,
};
