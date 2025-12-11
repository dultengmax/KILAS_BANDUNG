"use client"
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";

// Social media and detail data
const socialMedia = [
    {
        name: "Instagram",
        url: "https://instagram.com/contoh",
        icon: "📸",
        color: "#E1306C",
        shimmer: "#ffb4e2",
    },
    {
        name: "Twitter",
        url: "https://twitter.com/contoh",
        icon: "🐦",
        color: "#1DA1F2",
        shimmer: "#c6eaff",
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/company/contoh",
        icon: "💼",
        color: "#2867B2",
        shimmer: "#b4d1ff",
    },
];

const address = {
    street: "Jl. Merdeka No. 123",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "10110",
    country: "Indonesia",
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
};

const AboutPage = () => {
    return (
        <div>

            <Header />
        <motion.div
            className="about-animate-bg pt-12"
            style={{
                maxWidth: 720,
                margin: "0 auto",
                padding: "2.5rem 2rem",
                borderRadius: 24,
                overflow: "hidden",
                minHeight: 620,
                position: "relative",
                background: "radial-gradient(circle at top left, #dbeafe 0%, #f1f5f9 75%)",
            }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1
                variants={itemVariants}
                style={{
                    fontSize: 38,
                    fontWeight: 800,
                    marginBottom: 20,
                    letterSpacing: "-1px",
                    display: "inline-block",
                    background: "linear-gradient(90deg, #2563eb 40%, #6366f1 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
                whileHover={{ scale: 1.035, rotate: -1.5 }}
                transition={{ type: "spring", stiffness: 120 }}
            >
                Tentang Kami
            </motion.h1>

            <motion.p
                variants={itemVariants}
                style={{
                    fontSize: 20,
                    color: "#334155",
                    marginBottom: 30,
                    maxWidth: 600,
                    lineHeight: 1.48,
                }}
            >
                Kami adalah{" "}
                <span
                    style={{
                        background: "linear-gradient(90deg,#3b82f6,#07cc7c 90%)",
                        padding: "0 0.3em",
                        borderRadius: "5px",
                        color: "#fff",
                        fontWeight: 600,
                    }}
                >
                    perusahaan inovatif
                </span>{" "}
                yang berdedikasi untuk memberikan solusi <b>terbaik</b> bagi pelanggan kami.
                Dengan semangat{" "}
                <motion.span
                    whileHover={{ color: "#34d399", scale: 1.1 }}
                    style={{ color: "#0ea5e9" }}
                >
                    profesionalisme
                </motion.span>{" "}
                dan{" "}
                <motion.span
                    whileHover={{ color: "#818cf8", scale: 1.1 }}
                    style={{ color: "#6366f1" }}
                >
                    inovasi
                </motion.span>
                , kami selalu berusaha menjadi mitra <b>terpercaya</b> untuk bisnis Anda.
            </motion.p>

            <motion.section variants={itemVariants} style={{ marginTop: 30 }}>
                <motion.h2
                    style={{
                        fontSize: 26,
                        fontWeight: 700,
                        marginBottom: 16,
                        color: "#2563eb",
                        letterSpacing: "-0.02em",
                    }}
                    whileHover={{ scale: 1.04, color: "#0ea5e9" }}
                    transition={{ type: "tween" }}
                >
                    Media Sosial
                </motion.h2>
                <motion.ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        display: "flex",
                        gap: 28,
                        justifyContent: "start",
                    }}
                    variants={containerVariants}
                >
                    {socialMedia.map((sm, idx) => (
                        <motion.li
                            key={sm.name}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.17,
                                rotate: ["0deg", "-5deg", "3deg", "0deg"],
                                boxShadow: `0 8px 32px ${sm.shimmer}`,
                                background: `linear-gradient(130deg, #fff 60%, ${sm.shimmer} 120%)`,
                            }}
                            whileTap={{ scale: 0.96, rotate: 0 }}
                            animate={{
                                y: [10, 0, -5, 0],
                                transition: {
                                    duration: 1.3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: idx * 0.12,
                                },
                            }}
                            style={{
                                background: "#f3f4f6",
                                borderRadius: 16,
                                padding: "20px 32px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                cursor: "pointer",
                                boxShadow: "0 2px 14px rgba(16, 47, 94, 0.08)",
                                transition: "background 0.2s, box-shadow 0.2s",
                            }}
                        >
                            <motion.span
                                style={{
                                    fontSize: 38,
                                    marginBottom: 10,
                                    filter: "drop-shadow(0 2px 5px #7dd3fc80)",
                                }}
                                initial={{ y: 46, scale: 0.5, opacity: 0 }}
                                animate={{ y: 0, scale: 1, opacity: 1 }}
                                transition={{
                                    delay: 0.2 + idx * 0.1,
                                    type: "spring",
                                    stiffness: 130,
                                }}
                            >
                                {sm.icon}
                            </motion.span>
                            <motion.a
                                href={sm.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontWeight: 700,
                                    color: sm.color,
                                    textDecoration: "none",
                                    fontSize: 18,
                                    transition: "color 0.17s",
                                }}
                                whileHover={{ color: "#18181b", scale: 1.11 }}
                            >
                                {sm.name}
                            </motion.a>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.section>

            <motion.section variants={itemVariants} style={{ marginTop: 56 }}>
                <motion.h2
                    style={{
                        fontSize: 25,
                        fontWeight: 700,
                        marginBottom: 14,
                        color: "#1865ee",
                        letterSpacing: "-0.02em",
                    }}
                    whileHover={{ scale: 1.03, color: "#00b386" }}
                    transition={{ type: "spring", stiffness: 120 }}
                >
                    Alamat
                </motion.h2>
                <motion.address
                    style={{
                        fontSize: 18,
                        background: "linear-gradient(90deg,#f1f5f9 75%,#a5b4fc 150%)",
                        padding: "20px 34px",
                        borderRadius: 13,
                        borderLeft: "4px solid #1865ee",
                        color: "#22223b",
                        boxShadow: "0 1px 12px rgba(80,102,243,0.06)",
                        fontStyle: "normal",
                        letterSpacing: "0.01em",
                    }}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.41, duration: 0.6 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.58, duration: 0.36 }}
                        style={{ lineHeight: 1.6 }}
                    >
                        <motion.span
                            style={{
                                fontWeight: 700,
                                color: "#2563eb",
                                fontSize: 18,
                            }}
                            whileHover={{ scale: 1.07, color: "#06e2aa" }}
                            transition={{ type: "spring", stiffness: 190 }}
                        >
                            {address.street}
                        </motion.span>
                        <br />
                        <span>
                            {address.city}, {address.province}
                            <br />
                            {address.postalCode}, {address.country}
                        </span>
                    </motion.div>
                </motion.address>
            </motion.section>

            {/* Efek dekorasi bubble lebih rapi, animasi fade-in dan fade-out lebih natural */}
            <AnimatePresence key={1}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 0.14, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    style={{
                        position: "absolute",
                        left: 32,
                        top: 0,
                        zIndex: 0,
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, #6366f1 0%, #a5b4fc 70%, #fff 100%)",
                        filter: "blur(1px)",
                        pointerEvents: "none",
                        opacity: 0.14,
                    }}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 0.09, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.87, type: "spring" }}
                    style={{
                        position: "absolute",
                        bottom: 24,
                        right: 68,
                        zIndex: 0,
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, #38bdf8 0%, #7dd3fc 65%, #fff 100%)",
                        filter: "blur(1px)",
                        pointerEvents: "none",
                        opacity: 0.09,
                    }}
                />
            </AnimatePresence>
        </motion.div>
        </div>
    );
};

export default AboutPage;