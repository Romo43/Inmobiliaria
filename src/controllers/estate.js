import Estate from "../models/Estate.js";
import { generateUrl, destroyUrls } from "../helper/imageUpload.js";

// Estate search by search term, category, orderBy, order, limit, skip, createdAt, rooms params
const searchEstate = async (req, res) => {
  try {
    const { search, orderBy = "0", rooms, category, limit, page } = req.query;
    var query = {
      "contact.email": { $in: req.userEmail },
    };
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }
    if (rooms) {
      query = { ...query, "details.rooms": { $in: rooms } };
    }
    var filter = {};
    switch (orderBy) {
      // sort from oldest to newest
      case "0":
        filter = { createdAt: 1 };
        break;
      // sort from newest to oldest
      case "1":
        filter = { createdAt: -1 };
        break;
      // sort from cheapest to most expensive
      case "2":
        filter = { price: 1 };
        break;
      // sort from most expensive to cheapest
      case "3":
        filter = { price: -1 };
        break;
      default:
        filter = { createdAt: 1 };
        break;
    }
    const [searchData, total] = await Promise.all([
      Estate.find(query)
        .sort(filter)
        .skip((page - 1) * limit)
        .limit(limit),
      Estate.countDocuments(query),
    ]);
    res.status(200).json({ total, data: searchData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all user estates
const allEstates = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [userEstates, total] = await Promise.all([
      Estate.find({
        "contact.email": { $in: req.userEmail },
      })
        .skip((page - 1) * limit)
        .limit(limit),
      Estate.countDocuments({
        "contact.email": { $in: req.userEmail },
      }),
    ]);
    res.status(200).json({ total, data: userEstates });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get estate by id
const findEstateById = async (req, res) => {
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
    category,
    estate_status,
    area,
    equip,
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
    location,
  } = req.body;
  try {
    // Upload images
    const urls = await generateUrl(req.files);
    const newEstate = new Estate({
      name,
      description,
      price,
      category,
      estate_status,
      imgs: urls,
      areas: area,
      equipped: equip,
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
        coordinates: location,
      },
      contact: {
        uid: req.userId,
        username: req.userUsername,
        email: req.userEmail,
        phone: req.userPhone,
      },
    });
    await Estate.create(newEstate);
    res.status(201).json({ message: "Estate created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update estate by id
const updateEstateById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    category,
    estate_status,
    area,
    equip,
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
    location,
  } = req.body;
  try {
    const data = await Estate.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Estate not found" });
    }
    // Upload imgs
    const urls = await generateUrl(req.files);
    // Destroy imgs
    await destroyUrls(data.imgs);

    const newEstate = new Estate({
      _id: id,
      name: name,
      description: description,
      price: price,
      category: category,
      estate_status: estate_status,
      imgs: urls,
      areas: area,
      equipped: equip,
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
        coordinates: location,
      },
      contact: {
        uid: data.contact._id,
        username: data.contact.username,
        email: data.contact.email,
        phone: data.contact.phone,
      },
    });
    await Estate.findByIdAndUpdate(id, newEstate);
    res.status(200).json({ message: "Estate updated successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update estate status
const updateEstateStatusById = async (req, res) => {
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
  searchEstate,
  allEstates,
  findEstateById,
  createEstate,
  updateEstateById,
  updateEstateStatusById,
};
