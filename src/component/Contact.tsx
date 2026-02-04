import { motion } from "framer-motion";
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
      className="max-w-7xl mx-auto px-6 py-20 bg-gray-50"
    >
      <h2 className="text-4xl font-bold text-[#23c367] mb-6">Contact</h2>
      <p className="text-lg text-[#7090a6] leading-relaxed mb-12">
        Get in touch with Yapithe & Partners. Fill out the form below or reach us via email, phone, or visit us at our office.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* ================= CONTACT INFO + MAP ================= */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p>123 Business Street, Bonapriso, Douala, Cameroon</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p>+237 123 456 789</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p>info@yapithe.com</p>
          </div>

          <div className="mt-4 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Yapithe & Partners Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.123456789012!2d9.738567!3d4.048123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043c1234567890%3A0xabcdef1234567890!2sYapithe%20%26%20Partners!5e0!3m2!1sen!2scm!4v1678901234567!5m2!1sen!2scm"
              width="100%"
              height="250"
              className="border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* ================= CONTACT FORM ================= */}
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23c367]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23c367]"
          />
          <textarea
            placeholder="Message"
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23c367]"
            rows={5}
          />
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-[#23c367] text-white font-medium hover:scale-105 transition-transform"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;
