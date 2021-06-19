import sgMail from '@sendgrid/mail';

export default async (req, res) => {
  sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);
  const { email, token } = req.body;

  const msg = {
    to: email, // Change to your recipient
    from: process.env.EMAIL_FROM, // Change to your verified sender
    subject: `KoslowShop - E-Mail Verification`,
    text: 'KoslowShop - E-Mail Verification',
    html: `<h2>Hello!</h2> <br> <h3>Please use the link below to verify your account</h3> <br> <a href=${process.env.NEXTAUTH_URL}/auth/verify-email?email=${email}&token=${token} >CLICK</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      res.status(201).json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.status(401).json({ success: false });
    });
};
