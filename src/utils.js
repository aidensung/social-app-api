import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from 'jsonwebtoken';

export const generateSecret = () => {
  const randomNumber1 = Math.floor(Math.random() * adjectives.length);
  const randomNumber2 = Math.floor(Math.random() * nouns.length);
  return `${adjectives[randomNumber1]} ${nouns[randomNumber2]}`;
};

const sendEmail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD,
    },
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent');
    }
  });
};

export const sendSecretEmail = (address, secret) => {
  const email = {
    from: process.env.SENDER_EMAIL,
    to: address,
    subject: '🔒Login Secret for LikeLikes🔒',
    html: `Hello! Your login secret is <h2>${secret}</h2>Copy & paste it on the app/website to log in.`,
  };
  return sendEmail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
