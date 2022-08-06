import nodemailer from "nodemailer";
import { google } from "googleapis";
import { GOOGLE } from "../config/config.js";

// Function to send email
const sendEmail = async (token, user) => {
  const contentHTML = `<h1>${token}</h1>`;
  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE.ID,
    GOOGLE.SECRET,
    GOOGLE.REDIRECT
  );
  oAuth2Client.setCredentials({ refresh_token: GOOGLE.REFRESH_TOKEN });

  try {
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
      to: `${user}`,
      subject: "Token",
      html: contentHTML,
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return false;
      }
      return true;
    });
  } catch (err) {
    return false;
  }
};

export { sendEmail };
