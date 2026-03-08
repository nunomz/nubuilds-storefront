/* ──────────────────────────────────────────────────────────────
   i18n — locales, translation dictionaries, helpers
   ────────────────────────────────────────────────────────────── */

export type Locale = "en" | "pt" | "es";

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "pt", label: "Português", flag: "🇵🇹" },
    { code: "es", label: "Español", flag: "🇪🇸" },
];

/* ── Localized field helper ────────────────────────────────── */

/** Value that can be either a plain string or an object with per-locale keys. */
export type LocalizedString = string | Partial<Record<Locale, string>>;

/**
 * Resolve a `LocalizedString` to a plain string for the given locale.
 * Falls back to `en`, then to the first available value, then to `""`.
 */
export function localize(field: LocalizedString | undefined, locale: Locale): string {
    if (field === undefined || field === null) return "";
    if (typeof field === "string") return field;
    return field[locale] ?? field.en ?? Object.values(field)[0] ?? "";
}

/* ── UI translation dictionaries ───────────────────────────── */

const translations = {
    en: {
        // Nav
        "nav.products": "Products",
        "nav.feedback": "Feedback",
        "nav.about": "About",
        "nav.contact": "Contact",

        // Hero
        "hero.title": "Built Different.",
        "hero.subtitle": "Premium custom PCs engineered for peak performance. Crafted with precision, designed for power.",

        // Status
        "status.sold": "Sold",
        "status.available": "Available",

        // Product detail
        "product.back": "Back",
        "product.viewFeedback": "View Customer Feedback",
        "product.notFound": "Product not found",

        // Feedback detail
        "feedback.back": "Back to Feedback",
        "feedback.viewProduct": "View Product",
        "feedback.notFound": "Feedback not found",
        "feedback.reviewer": "Reviewer",
        "feedback.rating": "Rating",
        "feedback.soldDate": "Sold Date",
        "feedback.product": "Product",
        "feedback.price": "Price",

        // Filters
        "filter.all": "All",
        "filter.productType": "Product Type",

        // Empty states
        "empty.products": "No products match the selected filter.",
        "empty.feedback": "No feedback available yet.",

        // Contact page
        "contact.title": "Let's Build\nSomething Great.",
        "contact.subtitle": "Got a custom build in mind, or just want to say hello? Drop me a message and I'll get back to you as soon as possible.",
        "contact.quickResponse": "Quick Response",
        "contact.quickResponseDesc": "Usually within 24 hours",
        "contact.customBuilds": "Custom Builds",
        "contact.customBuildsDesc": "Tailored to your exact needs",
        "contact.sendMessage": "Send a Message",

        // Contact form
        "form.name": "Name",
        "form.namePlaceholder": "Your name",
        "form.email": "Email",
        "form.emailPlaceholder": "you@example.com",
        "form.message": "Message",
        "form.messagePlaceholder": "Tell me what you're looking for...",
        "form.send": "Send Message",
        "form.sending": "Sending...",
        "form.success": "Message sent successfully! I'll get back to you soon.",
        "form.errorDefault": "Something went wrong. Please try again.",
        "form.errorNetwork": "Network error. Please check your connection and try again.",

        // About
        "about.cta": "Learn more about me on my personal website",
    },
    pt: {
        "nav.products": "Produtos",
        "nav.feedback": "Avaliações",
        "nav.about": "Sobre",
        "nav.contact": "Contacto",

        "hero.title": "Feito para Ser Diferente.",
        "hero.subtitle": "PCs personalizados premium projetados para desempenho máximo. Montados com precisão, desenhados para potência.",

        "status.sold": "Vendido",
        "status.available": "Disponível",

        "product.back": "Voltar",
        "product.viewFeedback": "Ver Avaliação do Cliente",
        "product.notFound": "Produto não encontrado",

        "feedback.back": "Voltar às Avaliações",
        "feedback.viewProduct": "Ver Produto",
        "feedback.notFound": "Avaliação não encontrada",
        "feedback.reviewer": "Avaliador",
        "feedback.rating": "Classificação",
        "feedback.soldDate": "Data de Venda",
        "feedback.product": "Produto",
        "feedback.price": "Preço",

        "filter.all": "Todos",
        "filter.productType": "Tipo de Produto",

        "empty.products": "Nenhum produto corresponde ao filtro selecionado.",
        "empty.feedback": "Ainda não existem avaliações disponíveis.",

        "contact.title": "Vamos Construir\nAlgo Incrível.",
        "contact.subtitle": "Tens uma montagem personalizada em mente, ou só queres dizer olá? Envia-me uma mensagem e respondo o mais rápido possível.",
        "contact.quickResponse": "Resposta Rápida",
        "contact.quickResponseDesc": "Normalmente em 24 horas",
        "contact.customBuilds": "Montagens Personalizadas",
        "contact.customBuildsDesc": "Adaptadas às tuas necessidades",
        "contact.sendMessage": "Enviar Mensagem",

        "form.name": "Nome",
        "form.namePlaceholder": "O teu nome",
        "form.email": "Email",
        "form.emailPlaceholder": "tu@exemplo.com",
        "form.message": "Mensagem",
        "form.messagePlaceholder": "Diz-me o que procuras...",
        "form.send": "Enviar Mensagem",
        "form.sending": "A enviar...",
        "form.success": "Mensagem enviada com sucesso! Respondo em breve.",
        "form.errorDefault": "Algo correu mal. Por favor, tenta novamente.",
        "form.errorNetwork": "Erro de rede. Por favor, verifica a tua ligação e tenta novamente.",

        "about.cta": "Sabe mais sobre mim no meu website pessoal",
    },
    es: {
        "nav.products": "Productos",
        "nav.feedback": "Opiniones",
        "nav.about": "Acerca de",
        "nav.contact": "Contacto",

        "hero.title": "Hecho para Ser Diferente.",
        "hero.subtitle": "PCs personalizados premium diseñados para máximo rendimiento. Fabricados con precisión, diseñados para potencia.",

        "status.sold": "Vendido",
        "status.available": "Disponible",

        "product.back": "Volver",
        "product.viewFeedback": "Ver Opinión del Cliente",
        "product.notFound": "Producto no encontrado",

        "feedback.back": "Volver a Opiniones",
        "feedback.viewProduct": "Ver Producto",
        "feedback.notFound": "Opinión no encontrada",
        "feedback.reviewer": "Evaluador",
        "feedback.rating": "Puntuación",
        "feedback.soldDate": "Fecha de Venta",
        "feedback.product": "Producto",
        "feedback.price": "Precio",

        "filter.all": "Todos",
        "filter.productType": "Tipo de Producto",

        "empty.products": "Ningún producto coincide con el filtro seleccionado.",
        "empty.feedback": "Aún no hay opiniones disponibles.",

        "contact.title": "Construyamos\nAlgo Increíble.",
        "contact.subtitle": "¿Tienes un montaje personalizado en mente, o simplemente quieres saludar? Envíame un mensaje y te responderé lo antes posible.",
        "contact.quickResponse": "Respuesta Rápida",
        "contact.quickResponseDesc": "Normalmente en 24 horas",
        "contact.customBuilds": "Montajes Personalizados",
        "contact.customBuildsDesc": "Adaptados a tus necesidades",
        "contact.sendMessage": "Enviar Mensaje",

        "form.name": "Nombre",
        "form.namePlaceholder": "Tu nombre",
        "form.email": "Correo",
        "form.emailPlaceholder": "tu@ejemplo.com",
        "form.message": "Mensaje",
        "form.messagePlaceholder": "Cuéntame qué estás buscando...",
        "form.send": "Enviar Mensaje",
        "form.sending": "Enviando...",
        "form.success": "¡Mensaje enviado con éxito! Te responderé pronto.",
        "form.errorDefault": "Algo salió mal. Por favor, inténtalo de nuevo.",
        "form.errorNetwork": "Error de red. Por favor, verifica tu conexión e inténtalo de nuevo.",

        "about.cta": "Conoce más sobre mí en mi sitio web personal",
    },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

/** Type-safe translation lookup. Falls back to `en` if key is missing for the requested locale. */
export function t(locale: Locale, key: TranslationKey): string {
    return (translations[locale] as Record<string, string>)[key]
        ?? translations.en[key]
        ?? key;
}
