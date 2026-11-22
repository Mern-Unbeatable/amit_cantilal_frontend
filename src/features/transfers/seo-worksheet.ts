/**
 * SEO worksheet values for Off We Go transfer landing pages
 * (Work sheet for offwego.pt.xlsx — sheet: amit_cantilal).
 *
 * `inbound` = place this anchor on `fromPath`, linking to `path`.
 */
export const TRANSFER_SEO = {
  porto: {
    title: 'Lisbon to Porto Private Transfer',
    description:
      'Book a Lisbon to Porto private transfer in a premium Mercedes. Door-to-door chauffeur, tolls included, both directions, optional stops. Request a quote today.',
    path: '/transfers/lisbon-porto-private-transfer',
    inbound: {
      anchorText: 'private transfer from Lisbon to Porto',
      fromPath: '/tours/$slug',
      fromParams: {
        slug: 'porto-private-day-trip-from-lisbon-by-mercedes',
      },
    },
  },
  algarve: {
    title: 'Lisbon to Algarve Private Transfer',
    description:
      'Private Lisbon to Algarve transfer in a premium Mercedes. Door-to-door chauffeur to Lagos, Albufeira, Vilamoura & Faro. Tolls included. Request a quote.',
    path: '/transfers/lisbon-algarve-private-transfer',
    inbound: {
      anchorText: 'private transfer from Lisbon to Algarve',
      fromPath: '/tours/$slug',
      fromParams: {
        slug: 'algarve-private-day-trip-from-lisbon-benagil-cave-lagos',
      },
    },
  },
  seville: {
    title: 'Lisbon to Seville Private Transfer',
    description:
      'Private Lisbon to Seville transfer in a premium Mercedes. One vehicle, door-to-door across the border. Optional stops in Évora & Jabugo. Request a quote.',
    path: '/transfers/lisbon-seville-private-transfer',
    inbound: {
      anchorText: 'private transfer from Portugal to Spain',
      fromPath: '/faq',
    },
  },
  madrid: {
    title: 'Lisbon to Madrid Private Transfer',
    description:
      'Lisbon to Madrid transfer by private chauffeur. Premium Mercedes, door-to-door across the border, with optional stops in Évora & Cáceres. Request a quote.',
    path: '/transfers/lisbon-madrid-private-transfer',
    inbound: {
      anchorText: 'private chauffeur transfer to Madrid',
      fromPath: '/',
    },
  },
  comporta: {
    title: 'Lisbon to Comporta Private Transfer',
    description:
      'Lisbon to Comporta transfer by private chauffeur. Premium Mercedes, door-to-door to Carvalhal, Melides & Tróia. Airport pickup available. Request a quote.',
    path: '/transfers/lisbon-comporta-private-transfer',
    inbound: {
      anchorText: 'luxury transfer from Lisbon to Comporta',
      fromPath: '/blog',
    },
  },
  evora: {
    title: 'Lisbon to Évora Private Transfer',
    description:
      'Lisbon to Évora transfer by private chauffeur. Premium Mercedes, door-to-door, with optional Alentejo winery stops. Airport pickup available. Request a quote.',
    path: '/transfers/lisbon-evora-private-transfer',
    inbound: {
      anchorText: 'private transportation to Évora',
      fromPath: '/',
    },
  },
  douro: {
    title: 'Lisbon to Douro Valley Private Transfer',
    description:
      'Lisbon to Douro Valley transfer by private chauffeur. Premium Mercedes, door-to-door to Pinhão, Régua & Lamego. Airport pickup available. Request a quote.',
    path: '/transfers/lisbon-douro-valley-private-transfer',
    inbound: {
      anchorText: 'private chauffeur transfer to Douro Valley',
      fromPath: '/tours',
    },
  },
  airport: {
    title: 'Lisbon Airport Private Transfer',
    description:
      'Private Lisbon airport transfer with meet & greet, flight monitoring and 60 minutes free waiting. Premium Mercedes to Lisbon, Cascais and beyond. Book now.',
    path: '/transfers/lisbon-airport-private-transfer',
    inbound: {
      anchorText: 'Lisbon Airport chauffeur service',
      fromPath: '/hourly-service',
    },
  },
} as const

export const TOUR_INBOUND_LINKS = {
  'porto-private-day-trip-from-lisbon-by-mercedes': TRANSFER_SEO.porto,
  'algarve-private-day-trip-from-lisbon-benagil-cave-lagos':
    TRANSFER_SEO.algarve,
} as const
