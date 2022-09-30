const nodemailer = require('nodemailer'); 

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", 
            service: "gmail",
            post: 587,
            secure: false,
            auth: {
                user: "auctionbyintocode11@gmail.com",
                pass: "kvqjfvcyhfwamfmr"
            }
        })
        await transporter.sendMail({
            from: "auctionbyintocode11@gmail.com",
            to: String(email),
            subject: String(subject),
            html: `<a href=${text}>${text}</a>`
        })
        console.log('Email sent successfully')
    } catch (error) { 
        console.log('Email sent error: ' + error)

    }
}