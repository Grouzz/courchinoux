import { useMemo, useRef, useState } from "react";

const imageBase = import.meta.env.BASE_URL;

const services = [
  {
    title: "Réparation toiture",
    eyebrow: "Urgence & fuite",
    description:
      "Recherche d’infiltration, remplacement de tuiles, reprise d’étanchéité et intervention rapide autour de Lyon.",
    image: "service-roof-repair.jpg",
  },
  {
    title: "Rénovation complète",
    eyebrow: "Couverture & zinguerie",
    description:
      "Une remise à niveau durable pour protéger le bâti, valoriser le bien et éviter les réparations répétées.",
    image: "service-renovation.jpg",
  },
  {
    title: "Façade & peinture",
    eyebrow: "Extérieur propre",
    description:
      "Nettoyage, traitement, peinture extérieure et ravalement pour retrouver une façade nette et saine.",
    image: "service-facade.jpg",
  },
  {
    title: "Isolation",
    eyebrow: "Confort & économies",
    description:
      "Isolation des combles et zones sensibles pour réduire les pertes thermiques et améliorer le confort intérieur.",
    image: "service-insulation.jpg",
  },
];

const diagnosticSteps = [
  {
    id: "need",
    title: "Quel est votre besoin ?",
    options: ["Fuite ou urgence toiture", "Rénovation toiture", "Nettoyage / entretien", "Isolation"],
  },
  {
    id: "area",
    title: "Quelle zone est concernée ?",
    options: ["Toiture", "Gouttières", "Façade", "Combles"],
  },
  {
    id: "urgency",
    title: "Quel est le niveau d’urgence ?",
    options: ["Aujourd’hui", "Cette semaine", "Projet à planifier"],
  },
];

const reviews = [
  {
    name: "Marie L.",
    location: "Villeurbanne",
    text: "Intervention rapide après une fuite. L’équipe a été claire, propre et très professionnelle.",
  },
  {
    name: "Thomas B.",
    location: "Lyon 6e",
    text: "Devis transparent, délai respecté et très bon suivi. Le rendu de la toiture est impeccable.",
  },
  {
    name: "Sophie M.",
    location: "Bron",
    text: "Nettoyage de façade très réussi. Travail soigné et échange simple du premier appel à la fin du chantier.",
  },
];

const gallery = [
  { title: "Avant / après toiture", image: "gallery-roof-before-after.jpg" },
  { title: "Nettoyage façade", image: "gallery-facade-cleaning.jpg" },
  { title: "Rénovation couverture", image: "gallery-roof-renovation.jpg" },
  { title: "Isolation combles", image: "gallery-attic-insulation.jpg" },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function imageUrl(file) {
  return `${imageBase}images/${file}`;
}

function ImageSlot({ file, title, className = "", variant = "default" }) {
  const [missing, setMissing] = useState(false);

  return (
    <div className={cx("image-slot", `image-slot--${variant}`, className)}>
      {!missing && (
        <img
          src={imageUrl(file)}
          alt={title}
          loading="lazy"
          onError={() => setMissing(true)}
        />
      )}
      {missing && (
        <div className="image-slot__placeholder">
          <span>{title}</span>
          <strong>{file}</strong>
          <small>Remplacer ce placeholder par une image Gemini 4K</small>
        </div>
      )}
    </div>
  );
}

function Navbar({ onDiagClick }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <a className="brand" href="#top" onClick={close}>
        <span className="brand__main">Courchinoux</span>
        <span className="brand__sub">Rénovation</span>
      </a>

      <button className="nav-toggle" type="button" onClick={() => setOpen((v) => !v)} aria-label="Ouvrir le menu">
        <span />
        <span />
      </button>

      <nav className={cx("nav-links", open && "nav-links--open")}>
        <a href="#services" onClick={close}>Services</a>
        <button type="button" onClick={() => { close(); onDiagClick(); }}>Diagnostic IA</button>
        <a href="#realisations" onClick={close}>Réalisations</a>
        <a href="#avis" onClick={close}>Avis</a>
        <a href="#contact" onClick={close}>Contact</a>
        <a className="nav-cta" href="tel:0769311152" onClick={close}>07 69 31 11 52</a>
      </nav>
    </header>
  );
}

function Hero({ onDiagClick }) {
  return (
    <section id="top" className="hero section-grid">
      <div className="hero__content">
        <p className="eyebrow">Couvreur & rénovation à Villeurbanne</p>
        <h1>Une toiture saine. Un chantier clair. Une réponse rapide.</h1>
        <p className="hero__lead">
          Réparation de toiture, rénovation extérieure, isolation et urgences autour de Lyon et Villeurbanne.
          Une maquette moderne pensée pour convertir davantage de visiteurs en demandes de devis qualifiées.
        </p>
        <div className="hero__actions">
          <button className="button button--primary" type="button" onClick={onDiagClick}>Lancer le diagnostic IA</button>
          <a className="button button--secondary" href="tel:0769311152">Appeler maintenant</a>
        </div>
        <div className="trust-row" aria-label="Indicateurs de confiance">
          <span>Devis gratuit</span>
          <span>Intervention rapide</span>
          <span>4.9/5 avis clients</span>
          <span>Lyon & Villeurbanne</span>
        </div>
      </div>

      <div className="hero__visual">
        <ImageSlot file="hero-roofing-team.jpg" title="Image 4K chantier toiture / rénovation" variant="hero" />
        <div className="hero-card">
          <span className="hero-card__number">30 sec.</span>
          <span className="hero-card__text">Pré-diagnostic avant rappel</span>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section section--cream">
      <div className="section-heading">
        <p className="eyebrow">Services</p>
        <h2>Un site qui présente l’expertise sans surcharger le visiteur.</h2>
        <p>
          Des cartes courtes, visuelles et lisibles pour orienter vite le client vers la bonne demande.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <ImageSlot file={service.image} title={service.title} variant="card" />
            <div className="service-card__body">
              <p className="card-eyebrow">{service.eyebrow}</p>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#diagnostic">Obtenir un avis rapide</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DiagnosticAI({ diagRef }) {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const step = diagnosticSteps[current];
  const complete = current >= diagnosticSteps.length;

  const result = useMemo(() => {
    const need = answers.need || "Demande toiture";
    const area = answers.area || "Zone à préciser";
    const urgency = answers.urgency || "À qualifier";
    const city = "Villeurbanne / Lyon";

    const priority = urgency === "Aujourd’hui" ? "Priorité haute" : urgency === "Cette semaine" ? "Priorité normale" : "Projet planifié";
    const action = urgency === "Aujourd’hui" ? "Rappel conseillé dans l’heure" : urgency === "Cette semaine" ? "Rappel conseillé aujourd’hui" : "Rappel sous 24 à 48h";

    return { need, area, urgency, city, priority, action };
  }, [answers]);

  const selectOption = (value) => {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
    setTimeout(() => setCurrent((prev) => prev + 1), 180);
  };

  const reset = () => {
    setAnswers({});
    setCurrent(0);
    setContact({ name: "", phone: "" });
    setSubmitted(false);
  };

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="diagnostic" ref={diagRef} className="section diagnostic-section">
      <div className="diagnostic-layout">
        <div className="diagnostic-copy">
          <p className="eyebrow eyebrow--light">Diagnostic IA</p>
          <h2>Pré-diagnostic en 30 secondes, demande de devis mieux qualifiée.</h2>
          <p>
            Le module guide le visiteur avec quelques questions simples, puis prépare une fiche claire pour l’artisan : besoin, zone concernée, urgence et action recommandée.
          </p>
          <div className="note-box">
            <strong>Important</strong>
            <span>L’IA ne remplace pas l’expertise du couvreur. Elle aide seulement à structurer la demande avant le rappel.</span>
          </div>
        </div>

        <div className="diagnostic-card" aria-live="polite">
          <div className="diagnostic-card__top">
            <span>Assistant devis</span>
            <span>{Math.min(current + 1, diagnosticSteps.length)} / {diagnosticSteps.length}</span>
          </div>

          {!complete && (
            <div className="question-panel">
              <p className="question-label">Question {current + 1}</p>
              <h3>{step.title}</h3>
              <div className="option-grid">
                {step.options.map((option) => (
                  <button key={option} type="button" onClick={() => selectOption(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {complete && !submitted && (
            <form className="contact-form" onSubmit={submit}>
              <p className="question-label">Dernière étape</p>
              <h3>Où envoyer la demande structurée ?</h3>
              <label>
                Prénom
                <input
                  value={contact.name}
                  onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Votre prénom"
                  required
                />
              </label>
              <label>
                Téléphone
                <input
                  value={contact.phone}
                  onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Votre numéro"
                  inputMode="tel"
                  required
                />
              </label>
              <button className="button button--primary button--wide" type="submit">Générer la fiche</button>
            </form>
          )}

          {complete && submitted && (
            <div className="generated-result">
              <p className="result-kicker">Demande générée</p>
              <h3>{result.need}</h3>
              <div className="result-grid">
                <span>Zone concernée</span>
                <strong>{result.area}</strong>
                <span>Localisation</span>
                <strong>{result.city}</strong>
                <span>Urgence</span>
                <strong>{result.priority}</strong>
                <span>Action</span>
                <strong>{result.action}</strong>
              </div>
              <p className="result-summary">
                {contact.name}, votre demande est prête : {result.need.toLowerCase()} sur {result.area.toLowerCase()}, avec rappel recommandé selon le niveau d’urgence indiqué.
              </p>
              <button className="ghost-button" type="button" onClick={reset}>Recommencer la démo</button>
            </div>
          )}

          <div className="diagnostic-preview">
            <p>Ce que reçoit l’artisan</p>
            <span>Besoin + urgence + zone + coordonnées, dans une fiche lisible avant le rappel.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="realisations" className="section section--cream">
      <div className="section-heading section-heading--split">
        <div>
          <p className="eyebrow">Réalisations</p>
          <h2>Des images 4K pour vendre la qualité avant même l’appel.</h2>
        </div>
        <p>
          Les placeholders sont déjà dimensionnés. Il suffit de déposer les images Gemini dans le dossier public/images avec les bons noms.
        </p>
      </div>

      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <article className={cx("gallery-item", index === 0 && "gallery-item--large")} key={item.title}>
            <ImageSlot file={item.image} title={item.title} variant="gallery" />
            <div className="gallery-item__caption">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="avis" className="section reviews-section">
      <div className="section-heading">
        <p className="eyebrow">Avis clients</p>
        <h2>La preuve sociale, lisible et crédible.</h2>
        <p>Trois avis suffisent pour la maquette : propre, aéré, rassurant, sans transformer la page en mur de texte.</p>
      </div>

      <div className="reviews-grid">
        {reviews.map((review) => (
          <article className="review-card" key={review.name}>
            <div className="stars" aria-label="5 étoiles">★★★★★</div>
            <p>“{review.text}”</p>
            <div>
              <strong>{review.name}</strong>
              <span>{review.location}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CTA({ onDiagClick }) {
  return (
    <section id="contact" className="cta-section">
      <div className="cta-card">
        <p className="eyebrow eyebrow--light">Contact</p>
        <h2>Un doute sur votre toiture ?</h2>
        <p>Décrivez le besoin en quelques secondes et recevez un premier avis clair avant le rappel.</p>
        <div className="hero__actions hero__actions--center">
          <button className="button button--primary" type="button" onClick={onDiagClick}>Lancer le diagnostic IA</button>
          <a className="button button--secondary button--dark" href="tel:0769311152">07 69 31 11 52</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <a className="brand brand--footer" href="#top">
            <span className="brand__main">Courchinoux</span>
            <span className="brand__sub">Rénovation</span>
          </a>
          <p>185 Rue Jean Voillot, 69100 Villeurbanne</p>
          <p>Couvreur et rénovation extérieure autour de Lyon et Villeurbanne.</p>
        </div>
        <div>
          <h3>Services</h3>
          <a href="#services">Réparation toiture</a>
          <a href="#services">Rénovation complète</a>
          <a href="#services">Façade & peinture</a>
          <a href="#services">Isolation combles</a>
        </div>
        <div>
          <h3>Zones</h3>
          <span>Villeurbanne</span>
          <span>Lyon</span>
          <span>Bron</span>
          <span>Vaulx-en-Velin</span>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="tel:0769311152">07 69 31 11 52</a>
          <a href="mailto:contact@courchinoux-renovation.fr">contact@courchinoux-renovation.fr</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Démo non officielle — maquette commerciale.</span>
        <span>Pré-diagnostic simulé sans appel API.</span>
      </div>
    </footer>
  );
}

export default function App() {
  const diagRef = useRef(null);
  const scrollToDiag = () => diagRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main>
      <Navbar onDiagClick={scrollToDiag} />
      <Hero onDiagClick={scrollToDiag} />
      <Services />
      <DiagnosticAI diagRef={diagRef} />
      <Gallery />
      <Reviews />
      <CTA onDiagClick={scrollToDiag} />
      <Footer />
    </main>
  );
}
