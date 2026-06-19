// ─────────────────────────────────────────────────────────────────────────────
// i18n dictionary for the parallel Spanish (/es) subtree.
//
// `en` holds the CURRENT English strings VERBATIM so that shared components
// (LeadCaptureForm) rendered with the default locale produce byte-identical
// English output. `es` is the Spanish translation.
//
// ⚠️ es copy is PENDING FL-NATIVE HUMAN REVIEW. The /es pages ship `noindex`
// until Brandon/Eddy confirm this reads naturally to a Florida audience. Do not
// remove the noindex gate (src/app/es/layout.tsx) before that review.
// ─────────────────────────────────────────────────────────────────────────────

export type Locale = "en" | "es";

export interface LeadFormStrings {
  errBannerPre: string;
  errBannerPost: string;
  nameLabel: string;
  optional: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  errPhoneRequired: string;
  errPhoneInvalid: string;
  messageLabel: string;
  messagePlaceholder: string;
  trustLine: string;
  ctaDefault: string;
  ctaSub: string;
  submitting: string;
  tcpa: string;
  // success
  successHeading: string;
  successBodyPre: string;
  successBodyPost: string;
  youWord: string;
  successNeedSooner: string;
  // step 2
  step2Badge: string;
  step2HeadingPre: string;
  step2HeadingEm: string;
  step2HeadingPost: string;
  step2Sub: string;
  emailLabel: string;
  emailPlaceholder: string;
  helpTypeLabel: string;
  helpSelect: string;
  helpDenied: string;
  helpUnderpaid: string;
  helpNewClaim: string;
  helpProtect: string;
  helpAppraisal: string;
  helpOther: string;
  zipLabel: string;
  zipPlaceholder: string;
  filedLabel: string;
  filedAria: string;
  yes: string;
  no: string;
  attachLabel: string;
  attachHint: string;
  uploading: string;
  chooseFiles: string;
  addMore: string;
  fileMeta: (left: number) => string;
  removeAria: (name: string) => string;
  sendButton: (count: number) => string;
  skip: string;
  errSlots: (max: number, remaining: number) => string;
  errTooBig: (name: string) => string;
  errUploadFailed: string;
  errUploadRetry: string;
}

export interface HeroStrings {
  badgePre: string;
  badgeLicense: string;
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineAccent: string;
  subPre: string;
  subEm: string;
  subPost: string;
  positioning: string;
  phoneCta: string;
  scRating: string;
  scStatewide: string;
  scUpfront: string;
  cta: string;
}

export interface ContactStrings {
  label: string;
  heading: string;
  subheading: string;
  waMessage: string;
  waTitle: string;
  waSub: string;
  callTitle: string;
  callSub: string;
  emailTitle: string;
  emailSub: string;
  addrTitle: string;
  addrSub: string;
  formHeading: string;
  formSub: string;
}

export interface NavStrings {
  toggleLabel: string;
  toggleAria: string;
  freeReview: string;
}

export interface MetaStrings {
  homeTitle: string;
  homeDescription: string;
  contactTitle: string;
  contactDescription: string;
}

export interface Dict {
  leadForm: LeadFormStrings;
  hero: HeroStrings;
  contact: ContactStrings;
  nav: NavStrings;
  meta: MetaStrings;
}

const en: Dict = {
  leadForm: {
    errBannerPre: "Something went wrong. Please try again or call us directly at ",
    errBannerPost: ".",
    nameLabel: "Your Name",
    optional: "(optional)",
    namePlaceholder: "First name is fine",
    phoneLabel: "Phone Number",
    phonePlaceholder: "(555) 123-4567",
    errPhoneRequired: "Phone number is required so we can call you back",
    errPhoneInvalid: "Please enter a valid phone number",
    messageLabel: "What happened?",
    messagePlaceholder: "A roof leak, a denied claim, water damage…",
    trustLine: "No recovery, no fee. Licensed Florida public adjusters.",
    ctaDefault: "Get my free review",
    ctaSub: "Called back within the hour.",
    submitting: "Submitting...",
    tcpa: "By submitting, you agree to receive calls and SMS from Claim Remedy Adjusters about your claim. Reply STOP to opt out. Msg & data rates may apply. Your info is never shared.",
    successHeading: "Got it — we'll call within the hour.",
    successBodyPre: "Your claim review request is in. Eddy or a team member will ring",
    successBodyPost: "shortly.",
    youWord: "you",
    successNeedSooner: "Need us sooner? Reach out directly:",
    step2Badge: "Got it — we'll call within the hour",
    step2HeadingPre: "A few",
    step2HeadingEm: "optional details",
    step2HeadingPost: "to speed things up",
    step2Sub: "All optional — skip anything you'd rather tell us on the phone.",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    helpTypeLabel: "What kind of help?",
    helpSelect: "Select an option…",
    helpDenied: "My claim was denied",
    helpUnderpaid: "My claim was underpaid",
    helpNewClaim: "I need someone to handle my claim from the start",
    helpProtect: "I want to protect myself for a better settlement",
    helpAppraisal: "I need appraisal services",
    helpOther: "Other",
    zipLabel: "Property ZIP",
    zipPlaceholder: "e.g. 33016",
    filedLabel: "Filed a claim yet?",
    filedAria: "Have you filed a claim yet?",
    yes: "Yes",
    no: "No",
    attachLabel: "Attach documents",
    attachHint: "Denial letters, photos, your policy — speeds up the call.",
    uploading: "Uploading…",
    chooseFiles: "Choose files",
    addMore: "Add more",
    fileMeta: (left) => `PDF, JPG, PNG, DOC · 10 MB max · ${left} left`,
    removeAria: (name) => `Remove ${name}`,
    sendButton: (count) =>
      count > 0
        ? `Send details + ${count} file${count === 1 ? "" : "s"}`
        : "Send these details",
    skip: "Skip — we'll cover it on the call",
    errSlots: (max, remaining) =>
      `You can attach up to ${max} files. ${remaining} slot${remaining === 1 ? "" : "s"} remaining.`,
    errTooBig: (name) => `${name} is over 10 MB. Try compressing or splitting it.`,
    errUploadFailed: "Upload failed",
    errUploadRetry: "Upload failed. Please try again.",
  },
  hero: {
    badgePre: "Licensed FL Public Adjuster",
    badgeLicense: "#W549958",
    eyebrow: "FLORIDA PUBLIC ADJUSTER",
    headlineLine1: "We recover what",
    headlineLine2: "your insurer",
    headlineAccent: "won't pay.",
    subPre: "You were offered $18K. We got our last client $147K.",
    subEm: "That's what an advocate does.",
    subPost: "No recovery, no fee.",
    positioning: "We represent policyholders — never insurance companies.",
    phoneCta: "Or call (305) 733-1670",
    scRating: "Google rating",
    scStatewide: "Licensed statewide",
    scUpfront: "Upfront, ever",
    cta: "Get my free claim review",
  },
  contact: {
    label: "Contact us",
    heading: "Choose the fastest way<br/>to reach Claim Remedy.",
    subheading:
      "Reach the Claim Remedy team directly and get clear guidance on the next step for your claim.",
    waMessage: "Hi Claim Remedy, I'd like to book a free consultation.",
    waTitle: "Message on WhatsApp",
    waSub: "Start a free, pressure-free conversation",
    callTitle: "Call (305) 733-1670",
    callSub: "Speak directly with the team",
    emailTitle: "Email office@cradjusters.com",
    emailSub: "Send claim details, photos, or policy documents",
    addrTitle: "Miami Lakes Office",
    addrSub: "7900 Oak Ln, Suite 400, Miami Lakes, FL 33016",
    formHeading: "Or Submit a Claim Review Request",
    formSub: "Fill out the form below and our team will call you within the hour.",
  },
  nav: {
    toggleLabel: "ES",
    toggleAria: "Ver en español",
    freeReview: "Free Claim Review",
  },
  meta: {
    homeTitle: "Public Adjuster Miami | Claim Remedy Adjusters — Your Claim. Our Fight.",
    homeDescription:
      "Licensed Florida Public Adjusters representing homeowners across South Florida. No recovery, no fee.",
    contactTitle: "Contact",
    contactDescription: "Reach the Claim Remedy team directly about your Florida insurance claim.",
  },
};

const es: Dict = {
  leadForm: {
    errBannerPre: "Algo salió mal. Inténtelo de nuevo o llámenos directamente al ",
    errBannerPost: ".",
    nameLabel: "Su nombre",
    optional: "(opcional)",
    namePlaceholder: "Con su nombre basta",
    phoneLabel: "Número de teléfono",
    phonePlaceholder: "(555) 123-4567",
    errPhoneRequired: "Necesitamos su teléfono para poder devolverle la llamada",
    errPhoneInvalid: "Ingrese un número de teléfono válido",
    messageLabel: "¿Qué pasó?",
    messagePlaceholder: "Una gotera en el techo, un reclamo negado, daños por agua…",
    trustLine: "Sin recuperación, no hay honorarios. Ajustadores públicos con licencia en Florida.",
    ctaDefault: "Reciba su revisión gratis",
    ctaSub: "Le devolvemos la llamada dentro de una hora.",
    submitting: "Enviando...",
    tcpa: "Al enviar, acepta recibir llamadas y mensajes SMS de Claim Remedy Adjusters sobre su reclamo. Responda STOP para cancelar. Pueden aplicar tarifas de mensajes y datos. Su información nunca se comparte.",
    successHeading: "Listo — le llamamos dentro de una hora.",
    successBodyPre: "Recibimos su solicitud de revisión. Eddy o un miembro del equipo llamará a",
    successBodyPost: "en breve.",
    youWord: "usted",
    successNeedSooner: "¿Necesita ayuda antes? Contáctenos directamente:",
    step2Badge: "Listo — le llamamos dentro de una hora",
    step2HeadingPre: "Unos",
    step2HeadingEm: "datos opcionales",
    step2HeadingPost: "para agilizar todo",
    step2Sub: "Todo es opcional — omita lo que prefiera contarnos por teléfono.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "usted@correo.com",
    helpTypeLabel: "¿Qué tipo de ayuda necesita?",
    helpSelect: "Seleccione una opción…",
    helpDenied: "Mi reclamo fue negado",
    helpUnderpaid: "Mi reclamo fue mal pagado",
    helpNewClaim: "Necesito que manejen mi reclamo desde el inicio",
    helpProtect: "Quiero protegerme para un mejor acuerdo",
    helpAppraisal: "Necesito servicios de tasación (appraisal)",
    helpOther: "Otro",
    zipLabel: "Código postal de la propiedad",
    zipPlaceholder: "ej. 33016",
    filedLabel: "¿Ya presentó un reclamo?",
    filedAria: "¿Ya presentó un reclamo?",
    yes: "Sí",
    no: "No",
    attachLabel: "Adjuntar documentos",
    attachHint: "Cartas de negación, fotos, su póliza — agilizan la llamada.",
    uploading: "Subiendo…",
    chooseFiles: "Elegir archivos",
    addMore: "Agregar más",
    fileMeta: (left) =>
      `PDF, JPG, PNG, DOC · máx. 10 MB · ${left} ${left === 1 ? "restante" : "restantes"}`,
    removeAria: (name) => `Quitar ${name}`,
    sendButton: (count) =>
      count > 0
        ? `Enviar datos + ${count} archivo${count === 1 ? "" : "s"}`
        : "Enviar estos datos",
    skip: "Omitir — lo vemos en la llamada",
    errSlots: (max, remaining) =>
      `Puede adjuntar hasta ${max} archivos. ${remaining} ${remaining === 1 ? "espacio disponible" : "espacios disponibles"}.`,
    errTooBig: (name) => `${name} supera los 10 MB. Intente comprimirlo o dividirlo.`,
    errUploadFailed: "La carga falló",
    errUploadRetry: "La carga falló. Inténtelo de nuevo.",
  },
  hero: {
    badgePre: "Ajustador Público con Licencia FL",
    badgeLicense: "#W549958",
    eyebrow: "AJUSTADOR PÚBLICO DE FLORIDA",
    headlineLine1: "Recuperamos lo que",
    headlineLine2: "su aseguradora",
    headlineAccent: "no paga.",
    subPre: "Le ofrecieron $18K. A nuestro último cliente le conseguimos $147K.",
    subEm: "Eso es lo que hace un defensor.",
    subPost: "Sin recuperación, no hay honorarios.",
    positioning: "Representamos a los asegurados — nunca a las aseguradoras.",
    phoneCta: "O llame al (305) 733-1670",
    scRating: "Calificación en Google",
    scStatewide: "Con licencia en toda Florida",
    scUpfront: "Por adelantado, nunca",
    cta: "Reciba su revisión gratis",
  },
  contact: {
    label: "Contáctenos",
    heading: "Elija la forma más rápida<br/>de comunicarse con Claim Remedy.",
    subheading:
      "Comuníquese directamente con el equipo de Claim Remedy y reciba orientación clara sobre el siguiente paso de su reclamo.",
    waMessage: "Hola Claim Remedy, quisiera agendar una consulta gratis.",
    waTitle: "Escríbanos por WhatsApp",
    waSub: "Inicie una conversación gratis y sin presión",
    callTitle: "Llame al (305) 733-1670",
    callSub: "Hable directamente con el equipo",
    emailTitle: "Escriba a office@cradjusters.com",
    emailSub: "Envíe detalles del reclamo, fotos o documentos de la póliza",
    addrTitle: "Oficina en Miami Lakes",
    addrSub: "7900 Oak Ln, Suite 400, Miami Lakes, FL 33016",
    formHeading: "O envíe una solicitud de revisión de reclamo",
    formSub: "Complete el formulario y nuestro equipo le llamará dentro de una hora.",
  },
  nav: {
    toggleLabel: "EN",
    toggleAria: "View in English",
    freeReview: "Reciba su revisión gratis",
  },
  meta: {
    homeTitle: "Ajustador Público en Miami | Claim Remedy Adjusters — Su Reclamo. Nuestra Lucha.",
    homeDescription:
      "Ajustadores públicos con licencia en Florida que representan a propietarios en el sur de la Florida. Luchamos por el acuerdo que usted merece en reclamos de huracán, agua, fuego y techo. Sin recuperación, no hay honorarios.",
    contactTitle: "Contáctenos",
    contactDescription:
      "Comuníquese directamente con el equipo de Claim Remedy sobre su reclamo de seguro en Florida. Sin recuperación, no hay honorarios.",
  },
};

export const dictionaries: Record<Locale, Dict> = { en, es };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries.en;
}
