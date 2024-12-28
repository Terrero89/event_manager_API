import nodemailer from 'nodemailer';

// Ethereal Email Setup
export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
 // Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');


    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'allison.schmeler@ethereal.email',
        pass: 'gQpdKQAsuTbtVB5tYa'
        }
    });

    // Message object

    let message = {
        from: 'Sergio Terrero <allison.schmeler@ethereal.email>',
        to,
        subject,
        text,
        html,
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});
};
