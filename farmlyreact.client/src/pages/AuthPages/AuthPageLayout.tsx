import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative z-1">
            <div className="relative flex items-center justify-center w-full min-h-screen px-4 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/pexels-nc-farm-bureau-mark-20339265.jpg')",
                        filter: "brightness(0.9) saturate(1.15) contrast(1.05)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(circle at 40% 45%, rgba(16,20,12,0.25) 0%, rgba(16,20,12,0.55) 55%, rgba(16,20,12,0.85) 100%)"
                    }}
                />
                <div className="relative w-full max-w-sm">{children}</div>
            </div>
        </div>
    );
}