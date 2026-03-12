import { Linkedin, Facebook, MapPin, Clock, Mail, Phone, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";

const logos = [
  "/logo1.png", "/logo2.png", "/logo3.jpeg", "/logo4.jpeg",
  "/logo5.png", "/logo6.png", "/logo7.png", "/logo8.jpeg",
  "/logo9.jpg", "/logo10.png", "/logo11.png", "/logo12.jpg",
  "/logo13.png", "/logo14.png", "/logo15.svg", "/logo16.png",
  "/logo17.jpg", "/logo18.png", "/logo19.svg",
];

const Footer = () => {
  const socialLinks = [
    {
      icon: <Linkedin size={24} />,
      href: "https://cm.linkedin.com/company/yapithe-partners",
      label: "LinkedIn",
      color: "hover:bg-blue-600",
    },
    {
      icon: <Facebook size={24} />,
      href: "https://www.facebook.com/yapithe/?locale=fr_FR",
      label: "Facebook",
      color: "hover:bg-blue-700",
    },
    {
      icon: <Youtube size={24} />,
      href: "https://www.youtube.com/@cabinetyapithepartners302",
      label: "Youtube",
      color: "hover:bg-linear-to-br hover:from-purple-600 hover:to-pink-600",
    },
    {
      icon: <FaTiktok size={24} />,
      href: "https://www.tiktok.com/@yapitheandpartners?_r=1&_t=ZS-93izWRlWv8n",
      label: "YouTube",
      color: "hover:bg-black",
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: "https://wa.me/237699948421?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services.",
      label: "WhatsApp",
      color: "hover:bg-green-600",
    }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "4ème étage de l'immeuble BICEC face Neptune Oil, Carrefour Bastos, Yaoundé, Cameroun",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Lun – Ven: 08:00 – 17:00 | Sam: 09:00 – 13:00",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      text: "michel.yapithe@yapithepartners.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: "+237 699 948 421",
    },
  ];

  return (
    <footer className="mt-auto bg-linear-to-br from-[#0a4d7c] via-[#0c5d94] to-[#0a4d7c] text-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#23c367]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Section principale */}
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Colonne 1: À propos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-[#23c367] to-white text-transparent bg-clip-text">
                Yapithe & Partners
              </h3>
              <p className="text-white/80 leading-relaxed text-sm mb-6">
                Cabinet de conseil en gestion et contrôle de gestion,
                accompagnant les entreprises dans leur développement et leur
                transformation.
              </p>

              {/* Réseaux sociaux */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Colonne 2: Liens rapides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-3">
                {["Accueil", "Services", "À propos", "Actualités", "Contact"].map(
                  (link, index) => (
                    <li key={index}>
                      
                        <a href={`#${link}`} className="text-white/80 hover:text-[#23c367] transition-colors duration-300 text-sm flex items-center gap-2 group">
                          <span className="w-0 h-0.5 bg-[#23c367] group-hover:w-4 transition-all duration-300"></span>
                          {link}
                        </a>
                    </li>
                  )
                )}
              </ul>
            </motion.div>

            {/* Colonne 3: Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Nous contacter</h3>
              <ul className="space-y-3">
                {contactInfo.map((info, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#23c367]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="text-[#23c367]">{info.icon}</div>
                    </div>
                    <span className="text-white/80 leading-relaxed">
                      {info.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Séparateur */}
          <div className="border-t border-white/10 mb-8"></div>

          {/* Collaborations */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-6"
          >
            <h4 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-0.5 bg-linear-to-r from-transparent to-[#23c367]"></span>
              Nos Collaborations
              <span className="w-8 h-0.5 bg-linear-to-l from-transparent to-[#23c367]"></span>
            </h4>
          </motion.div>

          {/* Logos déroulants */}
          <div className="relative rounded-2xl overflow-hidden bg-white py-6 px-4 shadow-2xl mb-8">

            <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10"></div>

            <motion.div
              className="flex gap-12 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
              style={{ willChange: "transform" }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="shrink-0"                  
                >
                  <img
                    src={logo}
                    alt={`Partenaire ${index + 1}`}
                    className="h-12 w-auto object-contain transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-white">
                Yapithe & Partners
              </span>{" "}
              — Tous droits réservés.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;