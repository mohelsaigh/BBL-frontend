import React from "react";
import { useLocation, Link } from "react-router";
import GridShape from "../../components/common/GridShape";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const location = useLocation();
    const isSignIn = location.pathname === "/signin";

    if (isSignIn) {
        return (
            <div className="relative z-1">
                <div className="relative flex items-center justify-center w-full min-h-screen px-4 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('/images/pexels-nc-farm-bureau-mark-20339265.jpg')",
                            filter: "brightness(0.85) saturate(1.1) contrast(1.05)",
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(circle at 40% 45%, rgba(16,20,12,0.25) 0%, rgba(16,20,12,0.55) 55%, rgba(16,20,12,0.85) 100%)",
                        }}
                    />
                    <div className="relative w-full max-w-sm">{children}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
            <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
                {children}
                <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
                    <div className="relative flex items-center justify-center z-1">
                        <GridShape />
                        <div className="flex flex-col items-center max-w-xs">
                            <Link to="/" className="block mb-4">
                                <img
                                    width={231}
                                    height={48}
                                    src="/images/logo/auth-logo.svg"
                                    alt="Logo"
                                />
                            </Link>
                            <p className="text-center text-gray-400 dark:text-white/60">
                                Free and Open-Source Tailwind CSS Admin Dashboard Template
                            </p>
                        </div>
                    </div>
                </div>
                <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
                    <ThemeTogglerTwo />
                </div>
            </div>
        </div>
    );
}