import { motion } from "framer-motion";
import { Mail, Phone, Wrench } from "lucide-react";

const MaintenancePage = () => {
    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
            style={{ background: "#ffffff" }}
        >
            {/* Blobs décoratifs */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-60"
                style={{ background: "rgba(10,77,124,0.06)", filter: "blur(60px)" }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-60"
                style={{ background: "rgba(35,195,103,0.07)", filter: "blur(60px)" }} />

            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-10 relative z-10"
            >
                <span className="text-xl font-semibold" style={{ color: "#0a4d7c" }}>
                    Yapithe & Partners
                </span>
            </motion.div>

            {/* Carte principale */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative z-10 w-full max-w-lg text-center rounded-2xl px-10 py-12"
                style={{
                    background: "#fff",
                    border: "0.5px solid #e5e7eb",
                    boxShadow: "0 2px 32px rgba(10,77,124,0.06)",
                }}
            >
                {/* Icône */}
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "linear-gradient(135deg, #0a4d7c, #0c5d94)" }}
                >
                    <Wrench size={32} className="text-white" />
                </div>

                {/* Badge */}
                <span
                    className="inline-block text-xs font-medium px-4 py-1.5 rounded-full mb-5"
                    style={{ background: "rgba(35,195,103,0.12)", color: "#0f6e56" }}
                >
                    Maintenance en cours
                </span>

                <h1 className="text-2xl font-semibold mb-3" style={{ color: "#0a4d7c" }}>
                    Site temporairement indisponible
                </h1>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "#6b7280" }}>
                    Nous effectuons des améliorations pour vous offrir une meilleure
                    expérience. Nous serons de retour très prochainement.
                    Merci de votre compréhension.
                </p>

                <div className="border-t mb-6" style={{ borderColor: "#f0f0f0" }} />

                {/* Contacts */}
                <div className="flex flex-col gap-3 text-left">
                    {[
                        { icon: <Mail size={15} />, text: "michel.yapithe@yapithepartners.com" },
                        { icon: <Phone size={15} />, text: "+237 699 948 421" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                            style={{ background: "#f8fafc", color: "#374151" }}
                        >
                            <span style={{ color: "#0a4d7c" }}>{item.icon}</span>
                            {item.text}
                        </div>
                    ))}
                </div>
            </motion.div>

            <p className="mt-8 text-xs relative z-10" style={{ color: "#9ca3af" }}>
                © {new Date().getFullYear()} Yapithe & Partners — Tous droits réservés
            </p>
        </div>
    );
};

export default MaintenancePage;