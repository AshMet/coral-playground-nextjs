/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";

export default async function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  if (pathname === "/") {
    return NextResponse.redirect("/auth/home");
  }
  return NextResponse.next();
}
