import { Request, Response } from "express";
import { verifyJwt } from "../util/jwt.js";

export function validateJWT(Request,Response, next){
  const token = req.headers.authorization;
  console.log(token)
  if(!token) {
    console.log('token no existe')
    res.status(401).send("Unauthorized");
  }
  const [bearer, tokenValue] = token.split(" ");
  if (bearer !== "Bearer" || !tokenValue) {
    console.log("No se ha enviado el token");
    res.status(401).send("Unauthorized");
  }
  try {
    verifyJwt(tokenValue)
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Unauthorized");
  }
}
