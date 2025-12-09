import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { use } from "motion/react-m";
import { Particles } from "../components/Particles";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("From submitted:", formData);
      await emailjs.send(
        "service_9c7wm3c",
        "template_939myis",
        {
          from_name: formData.name,
          to_name: "Ricardo Camargo",
          from_email: formData.email,
          to_email: "ricardocamargodev@gmail.com",
          message: formData.message,
        },
        "H6V8Zw5Idr1Lb7q2C"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("Success", t.contact.successMessage);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showAlertMessage("danger", t.contact.errorMessage);
    }
  };
  return (
    <section
      id="contact"
      className="relative flex items-center c-space py-20"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={"#fff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-startw-full gap-5 mb-10">
          <h2 className="text-heading">{t.contact.title}</h2>
          <p className="font-normal text-neutral-400">
            {t.contact.description}
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              {t.contact.fullName}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder={t.contact.placeholders.name}
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              {t.contact.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder={t.contact.placeholders.email}
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              {t.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder={t.contact.placeholders.message}
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-mb cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? t.contact.send : t.contact.sending}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
