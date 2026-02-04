import { Linkedin, Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const logos = [
  "/logo1.jpeg",
  "/logo2.png",
  "/logo3.png",
  "/logo4.jpeg",
  "/logo5.jpeg",
  "/logo6.jpeg",
  "/logo7.jpeg",
  "/logo8.png",
  "/logo9.png",
  "/logo10.png",
  "/logo11.png",
  "/logo12.jpeg",
  "/logo13.jpeg",
  "/logo14.jpeg",
  "/logo15.jpeg",
  "/logo16.jpeg",
];

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="py-6 text-center bg-[#0a4d7c] text-white">

        {/* ===================== RÉSEAUX SOCIAUX ===================== */}
        <div className="flex justify-center gap-6 mb-3">
          <a
            href="https://wa.me/237673846813"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-125 hover:opacity-90"
          >
            <Linkedin size={28} strokeWidth={1.8} color="white"/>
          </a>

          <a
            href="https://www.instagram.com/jp_graphic_design/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-125 hover:opacity-90"
          >
            <Facebook size={28} strokeWidth={1.8} color="white" />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-125 hover:opacity-90"
          >
            <Instagram size={28} strokeWidth={1.8} color="white" />
          </a>
        </div>

        {/* ===================== LOCALISATION & HORAIRES ===================== */}
        <div className="text-sm opacity-95 mb-4">
          <p className="font-semibold">Location: 123 Business Street, Bonapriso, Douala, Cameroon</p>
          <p>Opening Hours: Mon – Fri: 08:00 – 17:00 | Sat: 09:00 – 13:00 | Sun: Closed</p>
        </div>

        {/* ===================== COPYRIGHT ===================== */}
        <p className="text-xm opacity-95">
          © {new Date().getFullYear()} Yapithe & Partners — Tous droits réservés.
        </p>

        {/* ===================== COLLABORATIONS ===================== */}
        <div className="mt-6 font-coco font-extrabold">
          <span>Nos Collaborations</span>
        </div>

        {/* ===================== LOGOS DÉROULANTS ===================== */}
        <div className="mt-2 overflow-hidden py-2 bg-white">
          <motion.div
            className="flex gap-11 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            whileHover={{ animationPlayState: "paused" }} // UX bonus
          >
            {[...logos, ...logos].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="logo"
                className="h-10 w-auto transition"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
