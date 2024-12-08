const Contact = require('../models/Contact'); // Import your model
const transporter = require('../Config/mailConfig'); // Import the mail configuration

exports.submitForm = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Save form data in the database
        const contactData = new Contact({ name, email, message });
        await contactData.save();

        // Email options for the user
        const userMailOptions = {
            from: 'muhammadtariq.wali2@gmail.com', // Replace with your email
            to: email,
            subject: 'Thank You for Your Feedback',
            text: `Dear ${name},\n\nThank you for your feedback. Here's what you said:\n"${message}"\n\nBest regards,\nYour Team`,
        };

        // Email options for the admin
        const adminMailOptions = {
            from: 'muhammadtariq.wali2@gmail.com', // Replace with your email
            to: 'muhammadtariq.wali2@gmail.com',
            subject: 'New Feedback Received',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send emails
        await transporter.sendMail(userMailOptions);
        await transporter.sendMail(adminMailOptions);

        // Redirect to Thank You page
        res.redirect(`/thankyou?name=${encodeURIComponent(name)}`);

    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.renderThankYou = (req, res) => {
    const name = req.query.name;
    res.render('thankyou', { name });
};
