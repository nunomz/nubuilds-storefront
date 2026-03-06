"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        const formData = new FormData(event.currentTarget);
        formData.append("access_key", "729fd01d-c0ee-4c12-9099-35e785f1ef20");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                formRef.current?.reset();
            } else {
                setStatus("error");
                setErrorMsg(data.message || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please check your connection and try again.");
        }
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: "var(--theme-surface)",
        borderColor: "var(--theme-border)",
        color: "var(--theme-text)",
    };

    const labelStyle: React.CSSProperties = {
        color: "var(--theme-text-muted)",
    };

    return (
        <motion.form
            ref={formRef}
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
        >
            {/* Name */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="contact-name"
                    className="text-sm font-medium tracking-wide uppercase"
                    style={labelStyle}
                >
                    Name
                </label>
                <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:opacity-40 focus:ring-2 focus:ring-white/20"
                    style={inputStyle}
                />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="contact-email"
                    className="text-sm font-medium tracking-wide uppercase"
                    style={labelStyle}
                >
                    Email
                </label>
                <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:opacity-40 focus:ring-2 focus:ring-white/20"
                    style={inputStyle}
                />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="contact-message"
                    className="text-sm font-medium tracking-wide uppercase"
                    style={labelStyle}
                >
                    Message
                </label>
                <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me what you're looking for..."
                    className="resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:opacity-40 focus:ring-2 focus:ring-white/20"
                    style={inputStyle}
                />
            </div>

            {/* Submit Button */}
            <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-200 disabled:opacity-60"
                style={{
                    backgroundColor: "var(--theme-text)",
                    color: "var(--theme-bg)",
                    borderColor: "var(--theme-text)",
                }}
            >
                {status === "submitting" ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="h-4 w-4" />
                        Send Message
                    </>
                )}
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence mode="wait">
                {status === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 rounded-xl border px-4 py-3"
                        style={{
                            borderColor: "rgba(52, 211, 153, 0.3)",
                            backgroundColor: "rgba(52, 211, 153, 0.08)",
                            color: "#34d399",
                        }}
                    >
                        <CheckCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm font-medium">
                            Message sent successfully! I&apos;ll get back to you soon.
                        </p>
                    </motion.div>
                )}

                {status === "error" && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 rounded-xl border px-4 py-3"
                        style={{
                            borderColor: "rgba(248, 113, 113, 0.3)",
                            backgroundColor: "rgba(248, 113, 113, 0.08)",
                            color: "#f87171",
                        }}
                    >
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm font-medium">{errorMsg}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.form>
    );
}
