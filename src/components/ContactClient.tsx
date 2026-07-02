"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Zap, Plus, CheckCircle2, Calendar as CalendarIcon, Clock, Phone, Building2 } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { useHasMounted } from "@/lib/useHasMounted";

export default function ContactClient() {
  const hasMounted = useHasMounted();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quickLeadSubmitted, setQuickLeadSubmitted] = useState(false);

  // Form bound states
  const [messageText, setMessageText] = useState("");
  const [selectedService, setSelectedService] = useState("faq");

  // Quick Lead simulation states
  const [agencyName, setAgencyName] = useState("");
  const [agencyPhone, setAgencyPhone] = useState("");
  const [agencyNote, setAgencyNote] = useState("");

  // Interactive booking states
  const [bookedDay, setBookedDay] = useState("");
  const [bookedTime, setBookedTime] = useState("");
  const [sidebarTab, setSidebarTab] = useState<"calendar" | "crm">("calendar");

  const bookingDates = (() => {
    const DAY_NAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const MONTH_SHORT = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    const result = [];
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (result.length < 8) {
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) {
        result.push({
          label: `${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`,
          name: `${DAY_NAMES[dow]} ${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`,
          status: "disponible",
        });
      }
      d.setDate(d.getDate() + 1);
    }
    return result;
  })();

  const timeSlots = [
    { time: "10:00", status: "disponible" },
    { time: "11:30", status: "disponible" },
    { time: "14:00", status: "occupé" },
    { time: "15:30", status: "disponible" },
  ];

  const selectBookingSlot = (dayName: string, timeVal: string, dayStatus: string, timeStatus: string) => {
    if (dayStatus === "occupé" || timeStatus === "occupé") return;
    setBookedDay(dayName);
    setBookedTime(timeVal);
    setSelectedService("audit");
    setMessageText(`Bonjour Denys, je souhaite réserver un créneau d'audit gratuit pour mon agence le ${dayName} à ${timeVal}. Nous cherchons à automatiser nos processus.`);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("ct-name"),
          phone: data.get("ct-phone"),
          email: data.get("ct-email"),
          service: selectedService,
          message: messageText,
          bookedDay,
          bookedTime,
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
        form.reset();
        setTimeout(() => {
          setFormSubmitted(false);
          setMessageText("");
          setBookedDay("");
          setBookedTime("");
        }, 6000);
      } else {
        setFormError(true);
      }
    } catch {
      setFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agencyName || !agencyPhone) return;
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: agencyName,
          phone: agencyPhone,
          email: "crm-demo@aioperations.studio",
          service: "audit",
          message: agencyNote || `Lead Terminal CRM — ${agencyName} / ${agencyPhone}`,
        }),
      });
    } catch {
      // fail silently — lead still shown as received to avoid friction
    }
    setQuickLeadSubmitted(true);
    setTimeout(() => {
      setQuickLeadSubmitted(false);
      setAgencyName("");
      setAgencyPhone("");
      setAgencyNote("");
    }, 5000);
  };

  return (
    <div className="page-wrapper container">
      {/* Intro */}
      <m.div
        className="contact-header"
        initial={hasMounted ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label text-gradient">Audit Gratuit · 30 min</span>
        <h1 className="contact-title font-primary">Discutons de votre projet IA</h1>
        <p className="contact-subtitle">
          Planifiez un audit opérationnel gratuit ou utilisez notre assistant de réservation pour pré-remplir votre demande instantanément.
        </p>
      </m.div>

      <div className="contact-layout">
        {/* Left Column: Form */}
        <m.div
          initial={hasMounted ? { opacity: 0, x: -30 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TiltCard className="ct-form-panel">
            <div className="ct-panel-header">
              <div className="ct-panel-icon-wrap">
                <Send size={18} />
              </div>
              <div>
                <h3 className="ct-panel-title">Demande d&apos;audit opérationnel</h3>
                <p className="ct-panel-subtitle">Réponse sous 24 heures garantie</p>
              </div>
            </div>

            {formSubmitted ? (
              <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="ct-success-msg">
                <div className="ct-success-icon-wrap">
                  <CheckCircle2 size={36} />
                </div>
                <h4>Demande reçue !</h4>
                <p>Denys vous contactera sous 24h pour valider votre créneau d&apos;audit.</p>
              </m.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="ct-form">
                <div className="ct-form-row">
                  <div className="ct-form-group">
                    <label htmlFor="ct-name">Nom / Agence <span className="ct-required">*</span></label>
                    <div className="ct-input-wrap">
                      <Building2 size={16} className="ct-input-icon" />
                      <input id="ct-name" name="ct-name" type="text" required placeholder="Ex: Agence Immobilière de Bezons" className="ct-input" />
                    </div>
                  </div>
                  <div className="ct-form-group">
                    <label htmlFor="ct-phone">Téléphone</label>
                    <div className="ct-input-wrap">
                      <Phone size={16} className="ct-input-icon" />
                      <input id="ct-phone" name="ct-phone" type="tel" placeholder="+33 6 12 34 56 78" className="ct-input" />
                    </div>
                  </div>
                </div>

                <div className="ct-form-group">
                  <label htmlFor="ct-email">Adresse E-mail <span className="ct-required">*</span></label>
                  <div className="ct-input-wrap">
                    <Mail size={16} className="ct-input-icon" />
                    <input id="ct-email" name="ct-email" type="email" required placeholder="contact@votre-agence.com" className="ct-input" />
                  </div>
                </div>

                <div className="ct-form-group">
                  <label htmlFor="ct-service">Type d&apos;intégration souhaitée</label>
                  <div className="ct-select-wrap">
                    <select 
                      id="ct-service" 
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="ct-select"
                    >
                      <option value="faq">IA FAQ & Auto-Replies</option>
                      <option value="combo">Combo Web + IA Agent</option>
                      <option value="crm">Qualification & CRM Sync</option>
                      <option value="booking">Booking & Automations Relance</option>
                      <option value="audit">Audit opérationnel gratuit</option>
                    </select>
                  </div>
                </div>

                <div className="ct-form-group">
                  <label htmlFor="ct-message">Message ou créneau choisi</label>
                  <textarea 
                    id="ct-message" 
                    rows={4} 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Ex: Nous recevons 100 leads/mois via SeLoger et les traitons à la main sur Excel..." 
                    className="ct-textarea"
                  ></textarea>
                </div>

                {formError && (
                  <p className="ct-form-error">Erreur d'envoi. Écrivez directement à <a href="mailto:denys@aioperations.studio">denys@aioperations.studio</a></p>
                )}
                <button type="submit" className="btn btn-primary ct-submit shine-hover" disabled={isSubmitting}>
                  <Send size={16} />
                  <span>{isSubmitting ? "Envoi en cours..." : "Envoyer ma demande d'audit"}</span>
                </button>
              </form>
            )}
          </TiltCard>
        </m.div>

        {/* Right Column: Unified Console */}
        <m.div
          className="ct-sidebar"
          initial={hasMounted ? { opacity: 0, x: 30 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <TiltCard className="ct-console">
            {/* Console Tabs */}
            <div className="ct-tabs">
              <button 
                type="button"
                className={`ct-tab ${sidebarTab === "calendar" ? "active" : ""}`}
                onClick={() => setSidebarTab("calendar")}
              >
                <CalendarIcon size={14} />
                <span>Agenda</span>
              </button>
              <button 
                type="button"
                className={`ct-tab ${sidebarTab === "crm" ? "active" : ""}`}
                onClick={() => setSidebarTab("crm")}
              >
                <Zap size={14} />
                <span>Terminal CRM</span>
              </button>
            </div>

            {/* Tab content */}
            <div className="ct-console-body">
              <AnimatePresence mode="wait">
                {sidebarTab === "calendar" ? (
                  <m.div
                    key="cal"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="ct-tab-desc">
                      Choisissez un créneau pour pré-remplir automatiquement le formulaire.
                    </p>

                    <div className="ct-cal-grid">
                      <span className="ct-cal-label">Jour</span>
                      <div className="ct-days-row">
                        {bookingDates.map((day) => (
                          <button
                            key={day.name}
                            type="button"
                            onClick={() => selectBookingSlot(day.name, bookedTime || "10:00", day.status, "disponible")}
                            className={`ct-day-btn ${bookedDay === day.name ? "active" : ""} ${day.status === "occupé" ? "busy" : ""}`}
                            disabled={day.status === "occupé"}
                          >
                            {day.label}
                          </button>
                        ))}
                      </div>

                      <span className="ct-cal-label">Heure</span>
                      <div className="ct-times-row">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => selectBookingSlot(bookedDay || "Lundi 29 Juin", slot.time, "disponible", slot.status)}
                            className={`ct-time-btn ${bookedTime === slot.time ? "active" : ""} ${slot.status === "occupé" ? "busy" : ""}`}
                            disabled={slot.status === "occupé"}
                          >
                            <Clock size={12} />
                            <span>{slot.time}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {bookedDay && bookedTime && (
                      <m.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="ct-booking-confirm"
                      >
                        <CheckCircle2 size={14} />
                        <span>Pré-sélectionné : {bookedDay} à {bookedTime}</span>
                      </m.div>
                    )}
                  </m.div>
                ) : (
                  <m.div
                    key="crm"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="ct-tab-desc">
                      Testez l&apos;insertion d&apos;un prospect dans notre CRM simulé.
                    </p>

                    {quickLeadSubmitted ? (
                      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ct-quick-success">
                        <CheckCircle2 size={24} />
                        <p>Lead inséré avec succès dans le CRM !</p>
                      </m.div>
                    ) : (
                      <form onSubmit={handleQuickLeadSubmit} className="ct-quick-form">
                        <div className="ct-input-wrap">
                          <Building2 size={16} className="ct-input-icon" />
                          <input
                            type="text"
                            required
                            value={agencyName}
                            onChange={(e) => setAgencyName(e.target.value)}
                            placeholder="Nom de l'agence *"
                            aria-label="Nom de l'agence"
                            className="ct-input"
                          />
                        </div>
                        <div className="ct-input-wrap">
                          <Phone size={16} className="ct-input-icon" />
                          <input
                            type="tel"
                            required
                            value={agencyPhone}
                            onChange={(e) => setAgencyPhone(e.target.value)}
                            placeholder="Téléphone *"
                            aria-label="Téléphone"
                            className="ct-input"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={agencyNote}
                          onChange={(e) => setAgencyNote(e.target.value)}
                          placeholder="Note rapide (ex: souhaite le Combo Web+IA)"
                          aria-label="Note rapide"
                          className="ct-textarea"
                        ></textarea>
                        <button type="submit" className="btn btn-secondary ct-quick-submit shine-hover">
                          <Plus size={16} />
                          <span>Insérer le Lead</span>
                        </button>
                      </form>
                    )}
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Console Footer */}
            <div className="ct-console-footer">
              <div className="ct-footer-brand">AI Operations Studio</div>
              <div className="ct-footer-items">
                <div className="ct-footer-item">
                  <MapPin size={12} />
                  <span>Bezons (95870), Val-d&apos;Oise</span>
                </div>
                <div className="ct-footer-item">
                  <Mail size={12} />
                  <a href="mailto:denys@aioperations.studio">denys@aioperations.studio</a>
                </div>
              </div>
            </div>
          </TiltCard>
        </m.div>
      </div>
    </div>
  );
}


