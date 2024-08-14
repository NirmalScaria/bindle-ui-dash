import FirebaseNextJSMiddleware from "firebase-nextjs/middleware/firebase-nextjs-middleware";
import { NextResponse } from "next/server";

const options = {
    allowRule: "^(?!\/contribute).*" // Allow paths under /_next/ and /__/auth/ (for firebase auth) publically.
}

async function myMiddleware(req) {
    if (req.nextUrl.pathname === "/components") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return NextResponse.next();
}

export default function middleware(req) {
    return FirebaseNextJSMiddleware({ req, options, middleware: myMiddleware });
}