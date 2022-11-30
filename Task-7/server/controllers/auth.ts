import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../connect";
import express from "express";
import { registerValidator, loginValidator } from "../utils/validators";

export const register = (req: express.Request, res: express.Response) => {
  let { username, email, password, img } = req.body;
  const { isInvalid, errors } = registerValidator(username, email, password);
  if (isInvalid) return res.status(400).json(errors);

  const q = "SELECT * FROM players WHERE email=?";
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      return res
        .status(409)
        .json({ email: "User is already registered with this E-mail" });
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    const q =
      "INSERT INTO players (`username`,`email`,`password`,`img`) VALUES(?)";
    db.query(q, [[username, email, password, img]], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data) return res.status(201).json("User has Been Registered");
    });
  });
};
export const login = (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  const { isInvalid, errors } = loginValidator(email, password);
  if (isInvalid) return res.status(400).json(errors);

  const q = "SELECT * FROM players WHERE email=?";
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json({ email: "User Not Found" });

    const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);
    if (!isPasswordCorrect)
      return res
        .status(401)
        .json({
          email: "Email or Password is not valid",
          password: "Email or Password is not valid",
        });

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
    const { password: pass, ...others } = data[0];
    res
      .cookie("accessToken", token, { httpOnly: true,secure:true,sameSite:"none",domain:"venerable-cendol-ceb673.netlify.app" })
      .status(200)
      .json(others);
  });
};
export const logout = (req: express.Request, res: express.Response) => {
  return res
    .clearCookie("accesstoken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};
