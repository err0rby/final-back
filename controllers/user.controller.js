const User = require("../models/User.model");
const Token = require("../models/Token.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { read } = require("fs");

module.exports.user = {
  getUsers: async (req, res) => {
    const data = await User.find({});
    res.json(data);
  },
  verifyUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });

      if (!user) {
        return res.status(400).send({ message: "Invalid link" });
      }
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) {
        return res.status(400).send({ message: "Invalid link" });
      }

      await user.updateOne({ verified: true });
      await token.remove();

      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (!candidate) {
      return res.status(401).send({ message: "User not find!" });
    }
    const valid = await bcrypt.compare(password, candidate.password);
    if (!valid) {
      return res.status(401).send({ message: "Wrong password!" });
    }
    if (!candidate.verified) {
      let token = await Token.findOne({ userId: candidate._id });
      if (!token) {
        token = await new Token({
          userId: candidate._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL_FRONTEND}user/${candidate._id}/verify/${token.token}`;
        await sendEmail(
          candidate.email,
          `Dear ${candidate.firstName} ${candidate.lastName}, pleace verify your account`,
          url
        );
      }
      return res
        .status(400)
        .send({ message: "An email sent to your account please verify." });
    }

    const payload = {
      id: candidate._id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "95h",
    });
    res.json({
      token,
      id: candidate._id,
    });
  },
  authUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ email: email });
      if (checkUser) {
        return res.status(409).send({ message: "User already exists!" });
      }
      const hash = await bcrypt.hash(password, 7);

      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });

      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `http://localhost:3000/user/${user._id}/verify/${token.token}`;
      await sendEmail(
        user.email,
        `Dear ${user.lastName} ${user.firstName}, pleace verify your account.`,
        url
      );

      res.status(201).send({ message: "User created successfully!" });
    } catch (e) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  updateUser: async (req, res) => {
    const data = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(data);
  },
  buyProductByUser: async (req, res) => {
    const data = await User.findByIdAndUpdate(req.params.id, {$addToSet: {purchasedProduct: req.body.productId}});
    // Найти продукт, найти юзера, отнять цену продукта от кошелька юзера (перед этим сделав проверку что такое возможно) - TODO
    res.json(data)
  }
};
