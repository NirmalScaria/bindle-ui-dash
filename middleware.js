import FirebaseNextJSMiddleware from "firebase-nextjs/middleware/firebase-nextjs-middleware";

const options = {
    allowRule: "^.*" // Allow paths under /_next/ and /__/auth/ (for firebase auth) publically.
}

export default function middleware(req) {
    return FirebaseNextJSMiddleware({ req, options });
}