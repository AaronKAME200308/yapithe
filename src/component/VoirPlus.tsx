import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

/* ==============================
   PAGE VOIR PLUS (MEDIA DETAILS)
   Reçoit image ou vidéo + infos
================================ */

const VoirPlus = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Données reçues depuis la section précédente
  const { media, type, title, description, date } = location.state || {};

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full bg-[#0a4d7c] px-6 py-16 flex flex-col items-center"
    >
      {/* Bouton Retour */}
      <div className="w-full max-w-6xl mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white text-[#0a4d7c] px-5 py-2 rounded-xl shadow hover:scale-105 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
      </div>

      {/* Contenu */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2"
      >
        {/* MEDIA */}
        <div className="w-full h-[300px] md:h-full bg-black flex items-center justify-center">
          {type === "video" ? (
            <video
              src={media}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={media}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* INFOS */}
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a4d7c] mb-4">
            {title || "Titre de la publication"}
          </h1>

          {date && (
            <p className="text-sm text-gray-500 mb-4">Publié le : {date}</p>
          )}

          <p className="text-[#4a5568] leading-relaxed mb-6">
            {description ||
              "Contenu détaillé de la publication. Ajoutez ici les informations complètes liées à cette actualité, chronique ou événement."}
          </p>

          {/* Bouton Action */}
          <button className="bg-gradient-to-r from-[#23c367] to-[#1fa85a] text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition w-fit">
            Nous Contacter
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default VoirPlus;
