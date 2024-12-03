export const constructorImages = {
  'red_bull': 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing.png.transform/2col/image.png',
  'ferrari': 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari.png.transform/2col/image.png',
  'mercedes': 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes.png.transform/2col/image.png',
  'mclaren': 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren.png.transform/2col/image.png',
  'aston_martin': 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin.png.transform/2col/image.png',
  'alpine': 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine.png.transform/2col/image.png',
  'visa_cash_app_rb': 'https://media.formula1.com/content/dam/fom-website/teams/2024/visa-cash-app-rb.png.transform/2col/image.png',
  'williams': 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams.png.transform/2col/image.png',
  'haas': 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team.png.transform/2col/image.png',
  'sauber': 'https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber.png.transform/2col/image.png'
};

export const countryFlags = {
  'austrian': 'https://flagcdn.com/w80/at.png',
  'british': 'https://flagcdn.com/w80/gb.png',
  'german': 'https://flagcdn.com/w80/de.png',
  'italian': 'https://flagcdn.com/w80/it.png',
  'french': 'https://flagcdn.com/w80/fr.png',
  'swiss': 'https://flagcdn.com/w80/ch.png',
  'american': 'https://flagcdn.com/w80/us.png'
};

export const constructorWikipediaURLs = {
  'red_bull': 'https://fr.wikipedia.org/wiki/Red_Bull_Racing',
  'ferrari': 'https://fr.wikipedia.org/wiki/Scuderia_Ferrari',
  'mercedes': 'https://fr.wikipedia.org/wiki/Mercedes-AMG_Petronas_Formula_One_Team',
  'mclaren': 'https://fr.wikipedia.org/wiki/McLaren_Racing',
  'aston_martin': 'https://fr.wikipedia.org/wiki/Aston_Martin_F1_Team',
  'alpine': 'https://fr.wikipedia.org/wiki/Alpine_F1_Team',
  'visa_cash_app_rb': 'https://fr.wikipedia.org/wiki/Racing_Bulls',
  'williams': 'https://fr.wikipedia.org/wiki/Williams_F1_Team',
  'haas': 'https://fr.wikipedia.org/wiki/Haas_F1_Team',
  'sauber': 'https://fr.wikipedia.org/wiki/Stake_F1_Team'
};

export const F1_CONSTANTS = {
  API_ENDPOINTS: {
    BASE_URL: 'https://ergast.com/api/f1',
    STANDINGS: (year: number) => `${F1_CONSTANTS.API_ENDPOINTS.BASE_URL}/${year}/constructorStandings.json`
  },
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
};