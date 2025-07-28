import nodemailer from 'nodemailer';
import fs from 'fs';

export const smtpConfig = {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
};

export const sendEmail = (to: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "sundaytechh339@gmail.com",
            pass:"jweu kpgy bbri wtwy"
        },
    });

    console.log("Transporter Created");
 
    const filePath='C:\\Users\\sunday\\Desktop\\notification\\recepients.json'; 

        const data = fs.readFileSync(filePath, 'utf-8');
        const recipientsData = JSON.parse(data);
        const recipients = recipientsData.email;

        if (!recipients || recipients.length === 0) {
            console.error('No recipients found in recipients.json');
            return;
        }

    const mailOptions = {
        from: smtpConfig.user,
        to: recipients.join(','), 
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error sending email to ${to}:`, error);
        } else {
            console.log(`Email sent to ${recipients.join(', ')}: ${info.response}`);
        }
    });
};
