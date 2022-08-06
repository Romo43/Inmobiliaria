import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import Token from "../models/token.js";
import User from "../models/User.js";
import { SECRET } from "../config/config.js";
import { google } from "googleapis";
import { GOOGLE } from "../config/config.js";

// Generate token
const generateToken = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ primary_email: email });
    // Generate number with 6 between 100000 and 999999
    const token = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const dateNow = new Date();
    const newToken = new Token({
      token: token,
      user: user._id,
      // Add 5 minutes to current time
      expiresIn: dateNow.setMinutes(dateNow.getMinutes() + 5),
    });
    const contentHTML = `<h1>${token}</h1>`;
    const oAuth2Client = new google.auth.OAuth2(
      GOOGLE.ID,
      GOOGLE.SECRET,
      GOOGLE.REDIRECT
    );
    oAuth2Client.setCredentials({ refresh_token: GOOGLE.REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "axioweb2022@gmail.com",
        clientId: GOOGLE.ID,
        clientSecret: GOOGLE.SECRET,
        refreshToken: GOOGLE.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "AxioWeb <axioweb2022@gmail.com>",
      to: `${email}`,
      subject: "Token",
      html: contentHTML,
    };
    // Send email
    transporter.sendMail(mailOptions);
    await newToken.save();
    res.status(200).json({ message: "Token generated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Validate token
const validateToken = async (req, res) => {
  const { token } = req.body;
  try {
    const userToken = await Token.findOne({
      token: token,
      status: true,
    });
    const user = await User.findById(userToken.user);
    const newToken = jwt.sign({ user }, SECRET);
    await Token.findByIdAndUpdate(userToken._id, { status: false });
    await User.findByIdAndUpdate(userToken.user, { change_password: true });
    res.status(200).json({ data: { token: newToken, user } });
  } catch (err) {}
};

export { generateToken, validateToken };
