// pages/api/send-video.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const videoFile = req.body.video;

    // Set up your email service (example with nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bdnaturetech@gmail.com',
        pass: 'rywrveucfzwpunjx',
      },
    });

    const mailOptions = {
      from: 'bdnaturetech@gmail.com',
      to: 'qudmeet@gmail.com',
      subject: 'User Recorded Video',
      text: 'Here is the recorded video.',
      attachments: [
        {
          filename: 'recorded_video.mp4',
          content: videoFile,
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'mailVideo sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send video' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// import { IncomingForm } from 'formidable';
// import nodemailer from 'nodemailer';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const form = new IncomingForm();

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form data:', err);
//         return res.status(500).json({ error: 'Error parsing form data' });
//       }

//       const videoFile = files.video;

//       if (!videoFile) {
//         return res.status(400).json({ error: 'No video file uploaded' });
//       }

//       // Create a Nodemailer transporter
//       const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         secure: process.env.EMAIL_SECURE === 'true',
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       try {
//         // Send email with video attachment
//         await transporter.sendMail({
//           from: process.env.EMAIL_USER,
//           to: 'raheemquddus@gmail.com',
//           subject: 'New Video Message',
//           text: 'You have received a new video message.',
//           attachments: [
//             {
//               filename: 'video_message.webm',
//               content: fs.createReadStream(videoFile.filepath),
//             },
//           ],
//         });

//         res.status(200).json({ message: 'Video message sent successfully' });
//       } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Error sending video message' });
//       } finally {
//         // Clean up the temporary file
//         fs.unlinkSync(videoFile.filepath);
//       }
//     });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }