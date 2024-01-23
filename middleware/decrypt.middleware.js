import { Request, Response } from "express";
import { decrypt as _decrypt } from "../util/crypto.js";

export function decrypt(Request,Response,next) {
  const data = req.body.data;
  try {
    if (data) {
      const decrypted = _decrypt(data);
      req.body = JSON.parse(decrypted);
    }
    next()
  } catch (error) {
    res.status(400).send("Bad Request");
  }
}
