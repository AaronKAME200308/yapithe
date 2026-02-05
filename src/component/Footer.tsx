import { Linkedin, Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";

 const logos = [
    "/logo1.png","/logo2.png","/logo3.jpeg","/logo4.jpeg",
    "/logo5.png","/logo6.png","/logo7.png","/logo8.jpeg",
    "/logo9.jpg","/logo10.png","/logo11.png","/logo12.jpg",
    "/logo13.png","/logo14.png","/logo15.svg","/logo16.png",
    "/logo17.jpg","/logo18.png","/logo19.svg",
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
          <p className="font-semibold">Localisation: 123 Business Street, Bastos, Yaounde, Cameroon</p>
          <p>Ouvert: Lun – Ven: 08:00 – 17:00 | Sam: 09:00 – 13:00 | Dim: Fermée</p>
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
