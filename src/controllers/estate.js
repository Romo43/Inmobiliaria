import Estate from "../models/Estate.js";
import fs from "fs-extra";
import { destroy, upload } from "../helper/imageUpload.js";

// Estate search


// Get all user estates
const allEstates = async (req, res) => {
  try {
    const userEstates = await Estate.find({
      "contact.email": { $in: req.userEmail },
    });
    res.status(200).json({ data: userEstates });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get estate by id
const findEstate = async (req, res) => {
  const { id } = req.params;
  try {
    // Find one estate by id and user email
    const estate = await Estate.findOne({
      _id: id,
      "contact.email": { $in: req.userEmail },
    });
    if (!estate) {
      return res.status(404).json({ message: "Estate not found" });
    }
    res.status(200).json({ data: estate });
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
    // Upload images
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await upload(path);
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
        username: req.Username,
        email: req.userEmail,
      },
    });
    await Estate.create(newEstate);
    res.status(201).json({ message: "Estate created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update estate by id
const updateEstate = async (req, res) => {
  const { id } = req.params;
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
    if (!data) {
      return res.status(404).json({ message: "Estate not found" });
    }
    // Destroy imgs
    const images = data.imgs;
    for (const image of images) {
      const id_media = image.id_media;
      destroy(id_media);
    }
    // Upload imgs
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await upload(path);
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
  const { id } = req.params;
  try {
    const estate = await Estate.findById(id);
    if (!estate) {
      res.status(404).json({ message: "This estate does not exist" });
    }
    if (estate.status === "sale") {
      await Estate.updateOne({ id }, { status: "sold" });
      res.status(200).json({ message: "Estate sold successfully" });
    } else {
      await Estate.updateOne({ id }, { status: "sale" });
      res.status(200).json({ message: "Estate for sale again" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  allEstates,
  findEstate,
  createEstate,
  updateEstate,
  updateEstateStatus,
};
