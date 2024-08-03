"use client";

export default function LoginButton() {
    function goToLogin() {
        window.location.href = "/login";
    }
    return <button className="bg-gradient-to-tl from-[#c278ba]  to-[#ae58a4] opacity-[95%] bg-cover border-white/10 hover:border-white/50 border text-white text-sm font-semibold px-3 py-1 rounded-md hover:opacity-100 transition-all" onClick={goToLogin}>Log In</button>
}