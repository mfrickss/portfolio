import { useRef, useState } from "react";
import { Particles } from "../components/Particles";
import { useLanguage } from "../contexts/language";
import { translations } from "../translations/translations";

const emptyForm = { name: "", email: "", message: "" };

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const submitting = useRef(false);
  const isLoading = status === "sending";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors((previous) => ({ ...previous, [name]: false }));
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (status === "success") setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting.current) return;
    const invalid = Object.fromEntries(["name", "message"].filter((field) => !formData[field].trim()).map((field) => [field, true]));
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      event.currentTarget.elements.namedItem(Object.keys(invalid)[0]).focus();
      return;
    }
    submitting.current = true;
    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        "service_9c7wm3c",
        "template_939myis",
        {
          from_name: formData.name.trim(),
          to_name: "Ricardo Camargo",
          from_email: formData.email.trim(),
          to_email: "ricardocamargodev@gmail.com",
          message: formData.message.trim(),
        },
        "H6V8Zw5Idr1Lb7q2C",
      );
      setFormData(emptyForm);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative c-space py-20 md:py-28"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color="#fff"
        refresh
      />
      <div className="relative grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="max-w-md lg:pt-8">
          <h2 id="contact-title" className="text-heading">{t.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-neutral-300">{t.description}</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral-400">{t.formHint}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          aria-busy={isLoading}
          className="min-w-0 rounded-2xl border border-white/10 bg-midnight/80 p-6 sm:p-8"
        >
          <fieldset disabled={isLoading} className="min-w-0 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="field-label">{t.fullName}</label>
                <input
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  id="contact-name"
                  name="name"
                  type="text"
                  className="field-input field-input-focus"
                  placeholder={t.placeholders.name}
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name ? <p id="name-error" role="alert" className="mt-2 text-sm text-red-300">{t.requiredContent}</p> : null}
              </div>
              <div>
                <label htmlFor="contact-email" className="field-label">{t.email}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="field-input field-input-focus"
                  placeholder={t.placeholders.email}
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="field-label">{t.message}</label>
              <textarea
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                id="contact-message"
                name="message"
                rows={6}
                className="field-input field-input-focus min-h-36 resize-y"
                placeholder={t.placeholders.message}
                value={formData.message}
                onChange={handleChange}
                required
              />
              {errors.message ? <p id="message-error" role="alert" className="mt-2 text-sm text-red-300">{t.requiredContent}</p> : null}
            </div>
            <button type="submit" disabled={isLoading} className="min-h-12 w-full cursor-pointer rounded-lg bg-royal px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-lavender focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender disabled:cursor-wait disabled:opacity-60">
              {isLoading ? t.sending : status === "error" ? t.retry : t.send}
            </button>
          </fieldset>
          <div role="status" aria-live="polite" aria-atomic="true" className="mt-4 min-h-12 text-sm leading-relaxed">
            {status === "success" ? <p className="text-mint">{t.successMessage}</p> : null}
            {status === "error" ? <p className="text-red-300">{t.errorMessage}</p> : null}
            {isLoading ? <p className="text-neutral-300">{t.sending}</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
