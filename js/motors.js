window.FINDER_DATA = {
  manufacturers: [
    { id: "bosch", label: "manufacturer.bosch", mark: "B" },
    { id: "shimano", label: "manufacturer.shimano", mark: "S" },
    { id: "yamaha", label: "manufacturer.yamaha", mark: "Y" },
    { id: "giant", label: "manufacturer.giant", mark: "G" },
    {
      id: "unknown",
      label: "manufacturer.unknown",
      mark: "?",
      result: {
        compatible: false,
        title: "result.manufacturer.unknown",
        reason: "reason.manufacturer.unknown"
      }
    },
    {
      id: "other",
      label: "manufacturer.other",
      mark: "+",
      result: {
        compatible: false,
        title: "result.manufacturer.other",
        reason: "reason.manufacturer.other"
      }
    }
  ],

  motors: [
    {
      id: "bosch-smart",
      manufacturer: "bosch",
      label: "motor.bosch-smart",
      note: "motor.bosch-smart.note",
      image: "images/bosch-smart-connectors.jpg",
      featured: true,
      order: 2,
      questions: [
        {
          id: "magnet",
          title: "question.magnet.title",
          help: "question.magnet.help",
          options: [
            { id: "spoke", label: "option.magnet.spoke", mark: "↗" },
            { id: "disc", label: "option.magnet.disc", mark: "◉" },
            { id: "rim", label: "option.magnet.rim", mark: "◌", notice: "notice.bosch.magnet" },
            {
              id: "valve",
              label: "option.magnet.valve",
              image: "images/bosch-smart-valve-magnet.jpg",
              notice: "notice.bosch.magnet"
            },
            { id: "abs", label: "option.magnet.abs", mark: "ABS", notice: "notice.bosch.abs" },
            { id: "unknown", label: "option.unknown", mark: "?" }
          ]
        },
        {
          id: "connect",
          title: "question.connect.title",
          help: "question.connect.help",
          options: [
            { id: "yes", label: "option.yes", mark: "✓" },
            { id: "no", label: "option.no", mark: "—" },
            { id: "unknown", label: "option.unknown", mark: "?" }
          ]
        }
      ],
      results: [
        {
          compatible: false,
          when: { answer: "magnet", in: ["rim", "valve"] },
          reason: "reason.bosch.magnet"
        },
        {
          compatible: false,
          when: { answer: "magnet", equals: "abs" },
          reason: "reason.bosch.abs"
        },
        {
          compatible: false,
          when: { answer: "magnet", equals: "unknown" },
          title: "result.bosch-magnet-unknown",
          reason: "reason.bosch-magnet-unknown"
        },
        {
          compatible: true,
          when: {
            all: [
              { answer: "magnet", in: ["spoke", "disc"] },
              { answer: "connect", in: ["yes", "no", "unknown"] }
            ]
          },
          product: {
            name: "product.bosch.title",
            description: "product.bosch.description",
            image: "images/redped-bosch.svg",
            url: "https://www.ebiketuningshop.com/products/redped-3-fuer-bosch-smart-system",
            warnings: [
              {
                text: "product.bosch.warning.connect",
                when: { answer: "connect", equals: "yes" }
              },
              { text: "product.bosch.warning.software" }
            ]
          }
        }
      ]
    },
    {
      id: "bosch-smart-gen5",
      manufacturer: "bosch",
      label: "motor.bosch-smart-gen5",
      note: "motor.bosch-smart-gen5.note",
      image: "images/bosch-gen5-connectors.jpg",
      featured: true,
      order: 3,
      result: {
        compatible: false,
        title: "result.bosch-smart-gen5",
        reason: "reason.bosch-smart-gen5"
      }
    },
    {
      id: "bosch-gen2-gen4",
      manufacturer: "bosch",
      label: "motor.bosch-gen2-gen4",
      note: "motor.bosch-gen2-gen4.note",
      image: "images/bosch-bes2-connectors.jpg",
      featured: true,
      order: 1,
      result: {
        compatible: true,
        product: {
          name: "product.bosch-bes2.title",
          image: "images/redped-3-bosch-bes2.webp",
          url: "https://redped.de/products/redped-3-fur-bosch-gen2-gen4-tuning-modul-e-bike-nicht-smart"
        }
      }
    },
    {
      id: "bosch-unknown",
      manufacturer: "bosch",
      label: "motor.bosch-unknown",
      mark: "?",
      order: 4,
      questions: [
        {
          id: "boschSystem",
          title: "question.bosch-system.title",
          help: "question.bosch-system.help",
          options: [
            {
              id: "bes2",
              label: "option.bosch-system.bes2",
              image: "images/bosch-bes2-charging-plug.png",
              imageFit: "contain",
              targetMotor: "bosch-gen2-gen4"
            },
            {
              id: "bes3",
              label: "option.bosch-system.bes3",
              image: "images/bosch-bes3-charging-plug.jpg",
              imageFit: "contain"
            }
          ]
        },
        {
          id: "boschBdu",
          title: "question.bosch-bdu.title",
          help: "question.bosch-bdu.help",
          visibleWhen: { answer: "boschSystem", equals: "bes3" },
          options: [
            {
              id: "bdu37",
              label: "option.bosch-bdu.bdu37",
              mark: "37",
              targetMotor: "bosch-smart"
            },
            {
              id: "bdu38",
              label: "option.bosch-bdu.bdu38",
              mark: "38",
              targetMotor: "bosch-smart-gen5"
            }
          ]
        }
      ],
      results: []
    },
    {
      id: "shimano-ep801-ep6",
      manufacturer: "shimano",
      label: "motor.shimano-ep801-ep6",
      order: 2,
      questionSet: "shimano-ep6"
    },
    {
      id: "shimano-ep8-ep5",
      manufacturer: "shimano",
      label: "motor.shimano-ep8-ep5",
      order: 1,
      questions: [
        {
          id: "port",
          title: "question.port.title",
          help: "question.port.help",
          options: [
            { id: "open", label: "option.port.open", image: "images/ports/round-open.svg" },
            { id: "tab", label: "option.port.tab", image: "images/ports/round-tab.svg" },
            {
              id: "closed",
              label: "option.port.closed",
              image: "images/ports/closed.svg",
              notice: "notice.shimano.port"
            },
            {
              id: "acc",
              label: "option.port.acc",
              image: "images/ports/acc.svg",
              notice: "notice.shimano.port"
            }
          ]
        }
      ],
      results: [
        {
          compatible: false,
          when: { answer: "port", in: ["closed", "acc"] },
          reason: "reason.shimano.port"
        },
        {
          compatible: true,
          when: { answer: "port", in: ["open", "tab"] },
          product: {
            name: "product.shimano-ep8.title",
            description: "product.shimano-ep8.description",
            image: "images/redped-shimano.svg",
            url: "https://www.ebiketuningshop.com/products/redped-2s-fuer-shimano-ep8",
            warnings: [{ text: "product.shimano-ep8.warning" }]
          }
        }
      ]
    },
    {
      id: "shimano-e-series",
      manufacturer: "shimano",
      label: "motor.shimano-e-series",
      note: "motor.shimano-e-series.note",
      order: 3,
      result: {
        compatible: false,
        title: "result.shimano-e-series",
        reason: "reason.motor.pending"
      }
    },
    {
      id: "shimano-unknown",
      manufacturer: "shimano",
      label: "motor.shimano-unknown",
      note: "motor.shimano-unknown.note",
      order: 4,
      result: {
        compatible: false,
        title: "result.shimano-unknown",
        reason: "reason.shimano-unknown"
      }
    },
    {
      id: "shimano-other",
      manufacturer: "shimano",
      label: "motor.shimano-other",
      note: "motor.shimano-other.note",
      order: 5,
      result: {
        compatible: false,
        title: "result.shimano-other",
        reason: "reason.shimano-other",
        action: {
          label: "actions.contact",
          url: "https://redped.de/policies/contact-information"
        }
      }
    },
    {
      id: "yamaha-classic",
      manufacturer: "yamaha",
      label: "motor.yamaha-classic",
      note: "motor.yamaha-classic.note",
      order: 1,
      result: {
        compatible: false,
        title: "result.yamaha-classic",
        reason: "reason.motor.pending"
      }
    },
    {
      id: "yamaha-current",
      manufacturer: "yamaha",
      label: "motor.yamaha-current",
      order: 2,
      result: {
        compatible: false,
        title: "result.yamaha-current",
        reason: "reason.motor.pending"
      }
    },
    {
      id: "yamaha-unknown",
      manufacturer: "yamaha",
      label: "motor.yamaha-unknown",
      note: "motor.yamaha-unknown.note",
      order: 3,
      result: {
        compatible: false,
        title: "result.yamaha-unknown",
        reason: "reason.yamaha-unknown"
      }
    },
    {
      id: "giant-pro",
      manufacturer: "giant",
      label: "motor.giant-pro",
      order: 1,
      result: { compatible: false, reason: "reason.motor.pending" }
    },
    {
      id: "giant-sport",
      manufacturer: "giant",
      label: "motor.giant-sport",
      order: 2,
      result: { compatible: false, reason: "reason.motor.pending" }
    },
    {
      id: "giant-life",
      manufacturer: "giant",
      label: "motor.giant-life",
      order: 3,
      result: { compatible: false, reason: "reason.motor.pending" }
    },
    {
      id: "giant-core",
      manufacturer: "giant",
      label: "motor.giant-core",
      order: 4,
      result: { compatible: false, reason: "reason.motor.pending" }
    },
    {
      id: "giant-unknown",
      manufacturer: "giant",
      label: "motor.giant-unknown",
      note: "motor.giant-unknown.note",
      order: 5,
      result: {
        compatible: false,
        title: "result.giant-unknown",
        reason: "reason.giant-unknown"
      }
    },
    {
      id: "giant-other",
      manufacturer: "giant",
      label: "motor.giant-other",
      note: "motor.giant-other.note",
      order: 6,
      result: {
        compatible: false,
        title: "result.giant-other",
        reason: "reason.giant-other"
      }
    }
  ],

  questionSets: {
    "shimano-ep6": {
      questions: [
        {
          id: "port",
          title: "question.port.title",
          help: "question.port.help",
          options: [
            {
              id: "open",
              label: "option.port.open",
              image: "images/ports/round-open.svg",
              notice: "notice.shimano.port"
            },
            {
              id: "tab",
              label: "option.port.tab",
              image: "images/ports/round-tab.svg",
              notice: "notice.shimano.port"
            },
            {
              id: "closed",
              label: "option.port.closed",
              image: "images/ports/closed.svg",
              notice: "notice.shimano.port"
            },
            { id: "acc", label: "option.port.acc", image: "images/ports/acc.svg" }
          ]
        },
        {
          id: "acc",
          title: "question.acc.title",
          help: "question.acc.help",
          visibleWhen: { answer: "port", equals: "acc" },
          options: [
            { id: "active", label: "option.acc.active", mark: "✓" },
            { id: "inactive", label: "option.acc.inactive", mark: "—", notice: "notice.shimano.acc" },
            { id: "unknown", label: "option.acc.unknown", mark: "?", notice: "notice.shimano.acc" }
          ]
        }
      ],
      results: [
        {
          compatible: false,
          when: { answer: "port", in: ["open", "tab", "closed"] },
          reason: "reason.shimano.port"
        },
        {
          compatible: true,
          when: {
            all: [
              { answer: "port", equals: "acc" },
              { answer: "acc", in: ["active", "inactive", "unknown"] }
            ]
          },
          product: {
            name: "product.shimano-ep6.title",
            description: "product.shimano-ep6.description",
            image: "images/redped-shimano.svg",
            url: "https://www.ebiketuningshop.com/products/redped-2s-fuer-shimano-ep801-und-ep6",
            warnings: [
              {
                text: "product.shimano-ep6.warning",
                when: { answer: "acc", in: ["inactive", "unknown"] }
              }
            ]
          }
        }
      ]
    }
  },

  fallbackResult: {
    compatible: false,
    reason: "reason.motor.pending"
  }
};
