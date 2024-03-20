"use server";

import * as AWS from "aws-sdk";
import * as NodeMailer from "nodemailer";

interface Props {
  userEmail: string[];
  subject: string;
  content: string;
}

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: "us-east-1",
});

AWS.config.getCredentials(function (error) {
  if (error) {
    console.log("Error while connecting to AWS:-", error.stack);
  }
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

const adminMail = "chimnanivivek14@gmail.com";

// create a transporter of nodemailer
const transporter = NodeMailer.createTransport({
  SES: ses,
});

export const sendEmail = async ({ userEmail, subject, content }: Props) => {
  try {
    const response = await transporter.sendMail({
      from: adminMail,
      to: userEmail,
      html: content,
      subject,
    });
    return response;
  } catch (error) {
    console.log(`Error while sending an email to the user:- ${error}`);
    throw error;
  }
};
