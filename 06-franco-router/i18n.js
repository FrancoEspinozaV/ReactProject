const i18n = {
  es: {
    title: 'Acerca de mi',
    button: 'ir al inicio',
    description:
      'Mi nombre es Franco Espinoza y estoy creando un clon de React Router',
  },
  en: {
    title: 'About us',
    button: 'Go to Home',
    description:
      'Hi! My name is Franco Espinoza and I am creating a React Router clone',
  },
}

export function useI18n(lang) {
  return i18n[lang] || i18n.en
}
