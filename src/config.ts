export const SITE = {
  name: 'CDMotorSport',
  tagline: 'Every ride tells a story',
  subtagline: 'Live the rally. Ride the legend.',
  url: 'https://cdmotorsports.vercel.app',
  description: 'Raids moto (rallye-raid) au Maroc en KOVE 450 Rally.',
  contact: {
    email: '[email@cdmotorsport.com]',
    phone: '+32 486 94 23 40',
    // Numéro brut pour construire l'URL wa.me (sans + ni espaces)
    whatsappNumber: '32486942340',
    instagram: '[Instagram]',
  },
  // URL prête à l'emploi pour les boutons WhatsApp
  get whatsappUrl() {
    return `https://wa.me/${this.contact.whatsappNumber}`;
  },
  // Formspree form ID — à remplacer par la vraie valeur (formspree.io → new form → copy ID xyzabc)
  // Puis form action = `https://formspree.io/f/${SITE.formspreeId}`
  formspreeId: 'xppaegba',
  // Google Analytics 4 measurement ID (format G-XXXXXXXXXX)
  gaId: 'G-7VF98VWPFT',
};
