import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

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
    html: `Hello! Your login secret is ${secret}.<br/>Copy & Paste it on the app/website to log in.`,
  };
  return sendEmail(email);
};
