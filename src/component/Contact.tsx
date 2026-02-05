import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  return (
    <motion.section
      id="Contact"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-5 bg-linear-to-r from-[#e0f7f1] to-[#ffffff]"
    >
       <h2 className="text-4xl font-bold bg-linear-to-r from-[#23c367] to-[#0a4d7c] text-transparent bg-clip-text mb-6">Contact</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-12">
       N’hésitez pas à contacter Yapithe & Partners. Remplissez le formulaire ci-dessous ou contactez-nous par courriel, par téléphone ou rendez-nous visite à nos bureaux.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* ================= CONTACT FORM ================= */}
        <form className="space-y-6 border border-[#23c367] shadow-[#0a4d7c] bg-[#0a4d7c] p-8 rounded-2xl shadow-xl">
          <input
            type="text"
            placeholder="Ton Nom"
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#23c367] transition"
          />
          <input
            type="email"
            placeholder="Ton Email"
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#23c367] transition"
          />
          <textarea
            placeholder="Message"
            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#23c367] transition"
            rows={5}
          />
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#23c367] via-[#23c367]/90 to-[#23c367]/80 text-white font-medium relative overflow-hidden hover:scale-105 transition-transform"
          >
            Envoyer Message
            
          </button>
        </form>

        {/* ================= CONTACT INFO + MAP ================= */}
        <div className="space-y-3">
          <div className=" border border-[#23c367] bg-white p-2 rounded-2xl shadow-xl flex items-center gap-4">
            <MapPin className="text-[#23c367] w-6 h-6" />
            <div>
              <h3 className="text-lg text-[#23c367] font-semibold mb-1">Adresse</h3>
              <p className="text-[#7090a6]">123 Business Street, Bastos, Yaounde, Cameroon</p>
            </div>
          </div>

          <div className=" border border-[#23c367] bg-white p-2 rounded-2xl shadow-xl flex items-center gap-4">
            <Phone className="text-[#23c367] w-6 h-6" />
            <div>
              <h3 className="text-lg text-[#23c367] font-semibold mb-1">Téléphone</h3>
              <p className="text-[#7090a6]">+237 123 456 789</p>
            </div>
          </div>

          <div className=" border border-[#23c367] bg-white p-2 rounded-2xl shadow-xl flex items-center gap-4">
            <Mail className="text-[#23c367] w-6 h-6" />
            <div>
              <h3 className="text-lg text-[#23c367] font-semibold mb-1">Email</h3>
              <p className="text-[#7090a6]">info@yapithe.com</p>
            </div>
          </div>

          <div className="border border-[#23c367] rounded-2xl overflow-hidden shadow-xl">
            <iframe
              title="Yapithe & Partners Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.352400850994!2d9.683488107195263!3d4.053420890452825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061139ab951eb81%3A0x171e0e7bf30982cf!2sYapithe%20Partner!5e0!3m2!1sfr!2scm!4v1770311306192!5m2!1sfr!2scm"
              width="100%"
              height="250"
              className="border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>    
    </motion.section>
  );
};

export default Contact;
