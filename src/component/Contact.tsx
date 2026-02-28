import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";
import { FaYoutube, FaLinkedinIn, FaFacebook, FaTiktok } from "react-icons/fa";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent) => {
  e.preventDefault();

  setIsSending(true);
  setStatus("idle");

  try {
    await emailjs.sendForm(
      "service_tnlbc8o",
      "template_8myq3da",
      form.current!,
      "WoriY4fjTF66t0bTR"
    );

    setStatus("success");
    form.current?.reset();

    setTimeout(() => {
      setStatus("idle");
    }, 3000);
  } catch (error) {
    setStatus("error");

    setTimeout(() => {
      setStatus("idle");
    }, 3000);
  } finally {
    setIsSending(false);
  }
};


  const contactInfo = [
    {
      icon: <FaFacebook className="w-6 h-6" />,
      label: "Facebook",
      value: "Yapithe",
      link: "https://www.facebook.com/yapithe/?locale=fr_FR",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Téléphone",
      value: "+237 699 948 421",
      link: "tel:+237699948421",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "contact@yapithepartners.com",
      link: "mailto:contact@yapithepartners.com",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: <FaLinkedinIn className="w-6 h-6" />,
      label: "LinkedIn",
      value: "Yapithe Partners",
      link: "https://cm.linkedin.com/company/yapithe-partners",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: <FaTiktok className="w-6 h-6" />,
      label: "TikTok",
      value: "@yapitheandpartners",
      link: "https://www.tiktok.com/@yapitheandpartners?_r=1&_t=ZS-93izWRlWv8n",
      color: "from-[#000000] to-[#000000]",
    },
    {
      icon: <FaYoutube className="w-6 h-6" />,
      label: "YouTube",
      value: "Yapithe Partners",
      link: "https://www.youtube.com/@cabinetyapithepartners302",
      color: "from-red-500 to-red-600",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      id="Contact"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-16 md:py-20 bg-linear-to-br from-[#e0f7f1] via-white to-[#f0f9ff] relative overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#23c367]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block px-4 py-2 bg-linear-to-r from-[#23c367]/20 to-[#0a4d7c]/20 backdrop-blur-sm rounded-full mb-4"
          >
            <span className="bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text font-semibold text-sm uppercase tracking-wider">
              Contactez-nous
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">
            Restons en contact
          </h2>
          <p className="text-base md:text-lg text-[#7090a6] leading-relaxed max-w-3xl">
            N'hésitez pas à contacter Yapithe & Partners. Remplissez le
            formulaire ci-dessous ou contactez-nous par courriel, par téléphone
            ou rendez-nous visite à nos bureaux.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* ================= CONTACT FORM ================= */}
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 bg-linear-to-br from-[#0a4d7c] to-[#0c5d94] p-8 md:p-10 rounded-3xl shadow-2xl border border-[#23c367]/30 relative overflow-hidden group"
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 space-y-5">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Votre nom
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Vous"
                  className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#23c367] focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Votre email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="votre@email.com"
                  className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#23c367] focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Votre message
                </label>
                <textarea
                  placeholder="Comment pouvons-nous vous aider ?"
                  name="message"
                  className="w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#23c367] focus:border-transparent transition-all duration-300 resize-none"
                  rows={5}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                className="w-full px-6 py-4 rounded-xl bg-linear-to-r from-[#23c367] to-[#1fa85a] text-white font-semibold relative overflow-hidden group/btn shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {isSending ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Envoi en cours...
                    </motion.div>
                  ) : status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center justify-center gap-2 text-white"
                    >
                      ✅ Message envoyé !
                    </motion.div>
                  ) : status === "error" ? (
                    <motion.div
                      key="error"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center justify-center gap-2 text-white"
                    >
                      ❌ Erreur d'envoi
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative z-10 flex items-center justify-center gap-2"
                    >
                      Envoyer le message
                      <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-linear-to-r from-[#1fa85a] to-[#23c367] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </div>
          </motion.form>

          {/* ================= CONTACT INFO + MAP ================= */}
          <div className="space-y-6">
            {/* Contact cards grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-[#23c367]/30 transition-all duration-300 relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${contact.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div className="relative flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-linear-to-br ${contact.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                    >
                      {contact.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        {contact.label}
                      </h3>
                      <p className="text-[#0a4d7c] font-semibold truncate group-hover:text-[#23c367] transition-colors">
                        {contact.value}
                      </p>
                    </div>

                    {/* Icône lien externe */}
                    <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group"
            >
              {/* Badge localisation */}
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#23c367]" />
                <span className="text-sm font-semibold text-[#0a4d7c]">
                  Notre bureau
                </span>
              </div>

              {/* <iframe
                title="Yapithe & Partners Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.352400850994!2d9.683488107195263!3d4.053420890452825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061139ab951eb81%3A0x171e0e7bf30982cf!2sYapithe%20Partner!5e0!3m2!1sfr!2scm!4v1770311306192!5m2!1sfr!2scm"
                width="100%"
                height="350"
                className="border-0 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              ></iframe> */}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;