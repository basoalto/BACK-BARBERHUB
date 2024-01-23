const { Request, Response } = require("express")


export function requestLog(Request, Response, next) {
  console.log(Request, Response, Request.query)
  next()
}
