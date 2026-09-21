window.FINDER_DATA = {
  manufacturers: [
    {
      id: "bosch",
      label: "manufacturer.bosch",
      image: "images/manufacturers/bosch.svg?v=2",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true
    },
    {
      id: "shimano",
      label: "manufacturer.shimano",
      image: "images/manufacturers/shimano.svg?v=2",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true
    },
    {
      id: "yamaha",
      label: "manufacturer.yamaha",
      image: "images/manufacturers/yamaha.svg?v=2",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true
    },
    {
      id: "giant",
      label: "manufacturer.giant",
      image: "images/manufacturers/giant.svg?v=2",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true
    },
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
      image: "images/bosch-smart-connectors.webp",
      imageFit: "contain",
      imageSize: "medium",
      imageZoom: false,
      order: 2,
      questions: [
        {
          id: "magnet",
          title: "question.magnet.title",
          options: [
            {
              id: "spoke",
              label: "option.magnet.spoke",
              image: "images/bosch-smart-spoke-magnet.webp",
              imageFit: "contain",
              imageSize: "medium",
              imageZoom: false
            },
            {
              id: "disc",
              label: "option.magnet.disc",
              image: "images/bosch-smart-disc-magnet.webp",
              imageFit: "contain",
              imageSize: "medium",
              imageZoom: false
            },
            {
              id: "rim",
              label: "option.magnet.rim",
              image: "images/bosch-smart-rim-magnet.webp",
              imageFit: "contain",
              imageSize: "medium",
              imageZoom: false,
              notice: "notice.bosch.magnet"
            },
            {
              id: "valve",
              label: "option.magnet.valve",
              image: "images/bosch-smart-valve-magnet.webp",
              imageFit: "contain",
              imageSize: "medium",
              imageZoom: false,
              notice: "notice.bosch.magnet"
            },
            {
              id: "abs",
              label: "option.magnet.abs",
              image: "images/bosch-smart-abs.webp",
              imageFit: "contain",
              imageSize: "medium",
              imageZoom: false,
              notice: "notice.bosch.abs"
            },
            { id: "unknown", label: "option.unknown", mark: "?" }
          ]
        },
        {
          id: "speedSensorConnector",
          title: "question.bosch-speed-sensor.title",
          help: "question.bosch-speed-sensor.help",
          image: "images/bosch-smart-speed-sensor-connector.webp",
          imageSize: "medium",
          visibleWhen: { answer: "magnet", equals: "unknown" },
          options: [
            { id: "yes", label: "option.yes", mark: "✓" },
            { id: "no", label: "option.no", mark: "—" }
          ]
        },
        {
          id: "connect",
          title: "question.connect.title",
          help: "question.connect.help",
          image: "images/bosch-connect-module.webp",
          imageSize: "medium",
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
          when: {
            all: [
              { answer: "magnet", equals: "unknown" },
              { answer: "speedSensorConnector", equals: "no" }
            ]
          },
          title: "result.bosch-speed-sensor-no",
          reason: "reason.bosch-speed-sensor-no"
        },
        {
          compatible: true,
          when: {
            all: [
              {
                any: [
                  { answer: "magnet", in: ["spoke", "disc"] },
                  {
                    all: [
                      { answer: "magnet", equals: "unknown" },
                      { answer: "speedSensorConnector", equals: "yes" }
                    ]
                  }
                ]
              },
              { answer: "connect", in: ["yes", "no", "unknown"] }
            ]
          },
          product: {
            name: "product.bosch.title",
            image: "images/redped-bosch-smart-system.webp",
            url: "https://redped.de/products/redped-fur-bosch-smart-system-bes3-tuning-e-bike-nicht-fur-ventilmagnet",
            warnings: [
              {
                text: "product.bosch.warning.connect",
                when: { answer: "connect", equals: "yes" }
              }
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
      image: "images/bosch-gen5-connectors.webp",
      imageFit: "contain",
      imageSize: "medium",
      imageZoom: false,
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
      image: "images/bosch-bes2-connectors.webp",
      imageFit: "contain",
      imageSize: "medium",
      imageZoom: false,
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
              image: "images/bosch-bes2-charging-plug.webp",
              imageFit: "contain",
              imageSize: "small",
              imageZoom: false,
              targetMotor: "bosch-gen2-gen4"
            },
            {
              id: "bes3",
              label: "option.bosch-system.bes3",
              image: "images/bosch-bes3-charging-plug.webp",
              imageFit: "contain",
              imageSize: "small",
              imageZoom: false
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
      image: "images/shimano-ep801-ep6-connectors.webp",
      imageFit: "contain",
      imageZoom: false,
      order: 2,
      result: {
        compatible: true,
        product: {
          name: "product.shimano-ep6.title",
          image: "images/redped-2s-shimano-ep801-ep6.webp",
          url: "https://redped.de/products/redped-2s-fur-shimano-ep6-ep801-tuning-modul-e-bike"
        }
      }
    },
    {
      id: "shimano-ep8-ep5",
      manufacturer: "shimano",
      label: "motor.shimano-ep8-ep5",
      image: "images/shimano-ep8-ep800-connectors.webp",
      imageFit: "contain",
      imageZoom: false,
      order: 1,
      result: {
        compatible: true,
        product: {
          name: "product.shimano-ep8.title",
          image: "images/redped-2s-shimano-ep8.webp",
          url: "https://redped.de/products/redped-2s-fur-shimano-ep8-tuning-ep800-e-bike-nicht-ep6-ep801"
        }
      }
    },
    {
      id: "shimano-e6100",
      manufacturer: "shimano",
      label: "motor.shimano-e6100",
      image: "images/shimano-e6100-connectors.webp",
      imageFit: "contain",
      imageZoom: false,
      order: 5,
      result: {
        compatible: true,
        product: {
          name: "product.shimano-e-series.title",
          image: "images/redped-2s-shimano-e-series.webp",
          url: "https://redped.de/products/redped-2s-fur-shimano-e8000-e7000-e6100-e6000-e5000-tuning-e-bike"
        }
      }
    },
    {
      id: "shimano-e8000",
      manufacturer: "shimano",
      label: "motor.shimano-e8000",
      image: "images/shimano-e8000-connectors.webp",
      imageFit: "contain",
      imageZoom: false,
      order: 3,
      result: {
        compatible: true,
        product: {
          name: "product.shimano-e-series.title",
          image: "images/redped-2s-shimano-e-series.webp",
          url: "https://redped.de/products/redped-2s-fur-shimano-e8000-e7000-e6100-e6000-e5000-tuning-e-bike"
        }
      }
    },
    {
      id: "shimano-e7000",
      manufacturer: "shimano",
      label: "motor.shimano-e7000",
      image: "images/shimano-e7000-connectors.webp",
      imageFit: "contain",
      imageZoom: false,
      order: 4,
      result: {
        compatible: true,
        product: {
          name: "product.shimano-e-series.title",
          image: "images/redped-2s-shimano-e-series.webp",
          url: "https://redped.de/products/redped-2s-fur-shimano-e8000-e7000-e6100-e6000-e5000-tuning-e-bike"
        }
      }
    },
    {
      id: "shimano-e6000",
      manufacturer: "shimano",
      label: "motor.shimano-e6000",
      image: "images/shimano-e6000-connectors.webp",
      imageFit: "contain",
      imageZoom: false,
      order: 6,
      result: {
        compatible: true,
        product: {
          name: "product.shimano-e-series.title",
          image: "images/redped-2s-shimano-e-series.webp",
          url: "https://redped.de/products/redped-2s-fur-shimano-e8000-e7000-e6100-e6000-e5000-tuning-e-bike"
        }
      }
    },
    {
      id: "shimano-e5000",
      manufacturer: "shimano",
      label: "motor.shimano-e5000",
      image: "images/shimano-e5000-connectors.webp",
      imageFit: "contain",
      imageZoom: false,
      order: 7,
      result: {
        compatible: true,
        product: {
          name: "product.shimano-e-series.title",
          image: "images/redped-2s-shimano-e-series.webp",
          url: "https://redped.de/products/redped-2s-fur-shimano-e8000-e7000-e6100-e6000-e5000-tuning-e-bike"
        }
      }
    },
    {
      id: "shimano-ep5",
      manufacturer: "shimano",
      label: "motor.shimano-ep5",
      image: "images/shimano-ep5-connectors.webp",
      imageFit: "contain",
      imageZoom: false,
      order: 8,
      result: {
        compatible: true,
        product: {
          name: "product.shimano-ep8.title",
          image: "images/redped-2s-shimano-ep8.webp",
          url: "https://redped.de/products/redped-2s-fur-shimano-ep8-tuning-ep800-e-bike-nicht-ep6-ep801"
        }
      }
    },
    {
      id: "shimano-other",
      manufacturer: "shimano",
      label: "motor.shimano-other",
      order: 9,
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
      id: "yamaha-pw-x",
      manufacturer: "yamaha",
      label: "motor.yamaha-pw-x",
      image: "images/yamaha-pw-x.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 5,
      result: {
        compatible: true,
        product: {
          name: "product.yamaha-pw-series.title",
          image: "images/redped-3-yamaha-pw-series.webp",
          url: "https://redped.de/products/redped-3-fur-pw-x-pw-x2-pw-st-pw-se-yamaha-tuning-e-bike",
          warnings: [{ text: "product.yamaha-pw-series.warning" }]
        }
      }
    },
    {
      id: "yamaha-pw-x2",
      manufacturer: "yamaha",
      label: "motor.yamaha-pw-x2",
      image: "images/yamaha-pw-x2.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 4,
      result: {
        compatible: true,
        product: {
          name: "product.yamaha-pw-series.title",
          image: "images/redped-3-yamaha-pw-series.webp",
          url: "https://redped.de/products/redped-3-fur-pw-x-pw-x2-pw-st-pw-se-yamaha-tuning-e-bike",
          warnings: [{ text: "product.yamaha-pw-series.warning" }]
        }
      }
    },
    {
      id: "yamaha-pw-x3",
      manufacturer: "yamaha",
      label: "motor.yamaha-pw-x3",
      image: "images/yamaha-pw-x3.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 2,
      result: {
        compatible: true,
        product: {
          name: "product.yamaha-pw-x3.title",
          image: "images/redped-3-yamaha-pw-x3-pw-s2.webp",
          url: "https://redped.de/products/redped-3-fur-pw-x3-pw-s2-yamaha-tuning-e-bike",
          warnings: [{ text: "product.yamaha-pw-x3.warning" }]
        }
      }
    },
    {
      id: "yamaha-pw-xm",
      manufacturer: "yamaha",
      label: "motor.yamaha-pw-xm",
      image: "images/yamaha-pw-xm.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 9,
      result: {
        compatible: true,
        product: {
          name: "product.yamaha-pw-x3.title",
          image: "images/redped-3-yamaha-pw-x3-pw-s2.webp",
          url: "https://redped.de/products/redped-3-fur-pw-x3-pw-s2-yamaha-tuning-e-bike",
          warnings: [{ text: "product.yamaha-pw-x3.warning" }]
        }
      }
    },
    {
      id: "yamaha-air-drive",
      manufacturer: "yamaha",
      label: "motor.yamaha-air-drive",
      image: "images/yamaha-air-drive.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 10,
      result: {
        compatible: true,
        product: {
          name: "product.yamaha-pw-series.title",
          image: "images/redped-3-yamaha-pw-series.webp",
          url: "https://redped.de/products/redped-3-fur-pw-x-pw-x2-pw-st-pw-se-yamaha-tuning-e-bike",
          warnings: [{ text: "product.yamaha-pw-series.warning" }]
        }
      }
    },
    {
      id: "yamaha-pw-te",
      manufacturer: "yamaha",
      label: "motor.yamaha-pw-te",
      image: "images/yamaha-pw-te.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 6,
      result: {
        compatible: true,
        product: {
          name: "product.yamaha-pw-series.title",
          image: "images/redped-3-yamaha-pw-series.webp",
          url: "https://redped.de/products/redped-3-fur-pw-x-pw-x2-pw-st-pw-se-yamaha-tuning-e-bike",
          warnings: [{ text: "product.yamaha-pw-series.warning" }]
        }
      }
    },
    {
      id: "yamaha-pw-ce",
      manufacturer: "yamaha",
      label: "motor.yamaha-pw-ce",
      image: "images/yamaha-pw-ce.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 7,
      result: {
        compatible: true,
        product: {
          name: "product.yamaha-pw-series.title",
          image: "images/redped-3-yamaha-pw-series.webp",
          url: "https://redped.de/products/redped-3-fur-pw-x-pw-x2-pw-st-pw-se-yamaha-tuning-e-bike",
          warnings: [{ text: "product.yamaha-pw-series.warning" }]
        }
      }
    },
    {
      id: "yamaha-pw-se",
      manufacturer: "yamaha",
      label: "motor.yamaha-pw-se",
      image: "images/yamaha-pw-se.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 8,
      result: {
        compatible: true,
        product: {
          name: "product.yamaha-pw-series.title",
          image: "images/redped-3-yamaha-pw-series.webp",
          url: "https://redped.de/products/redped-3-fur-pw-x-pw-x2-pw-st-pw-se-yamaha-tuning-e-bike",
          warnings: [{ text: "product.yamaha-pw-series.warning" }]
        }
      }
    },
    {
      id: "yamaha-pw-st",
      manufacturer: "yamaha",
      label: "motor.yamaha-pw-st",
      image: "images/yamaha-pw-st.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 1,
      result: {
        compatible: true,
        product: {
          name: "product.yamaha-pw-series.title",
          image: "images/redped-3-yamaha-pw-series.webp",
          url: "https://redped.de/products/redped-3-fur-pw-x-pw-x2-pw-st-pw-se-yamaha-tuning-e-bike",
          warnings: [{ text: "product.yamaha-pw-series.warning" }]
        }
      }
    },
    {
      id: "yamaha-current",
      manufacturer: "yamaha",
      label: "motor.yamaha-current",
      image: "images/yamaha-pw-s2.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 3,
      result: {
        compatible: true,
        product: {
          name: "product.yamaha-pw-x3.title",
          image: "images/redped-3-yamaha-pw-x3-pw-s2.webp",
          url: "https://redped.de/products/redped-3-fur-pw-x3-pw-s2-yamaha-tuning-e-bike",
          warnings: [{ text: "product.yamaha-pw-x3.warning" }]
        }
      }
    },
    {
      id: "yamaha-unknown",
      manufacturer: "yamaha",
      label: "motor.yamaha-unknown",
      mark: "?",
      order: 11,
      questions: [
        {
          id: "yamahaConnector",
          title: "question.yamaha-connector.title",
          help: "question.yamaha-connector.help",
          options: [
            {
              id: "pw-x3",
              label: "option.yamaha-connector.pw-x3",
              image: "images/yamaha-pw-x3-connectors.webp",
              imageFit: "contain",
              imageZoom: false,
              hideLabel: true,
              targetMotor: "yamaha-pw-x3"
            },
            {
              id: "pw-x",
              label: "option.yamaha-connector.pw-x",
              image: "images/yamaha-pw-x-connectors.webp",
              imageFit: "contain",
              imageZoom: false,
              hideLabel: true,
              targetMotor: "yamaha-pw-x"
            }
          ]
        }
      ],
      results: []
    },
    {
      id: "giant-pro",
      manufacturer: "giant",
      label: "motor.giant-pro",
      image: "images/giant-syncdrive-pro.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 1,
      result: {
        compatible: true,
        product: {
          name: "product.giant-syncdrive.title",
          image: "images/redped-3-giant-syncdrive.webp",
          url: "https://redped.de/products/redped-3-fur-giant-syncdrive-pro-sport-life-core-tuning-e-bike"
        }
      }
    },
    {
      id: "giant-sport",
      manufacturer: "giant",
      label: "motor.giant-sport",
      image: "images/giant-syncdrive-sport.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 2,
      result: {
        compatible: true,
        product: {
          name: "product.giant-syncdrive.title",
          image: "images/redped-3-giant-syncdrive.webp",
          url: "https://redped.de/products/redped-3-fur-giant-syncdrive-pro-sport-life-core-tuning-e-bike"
        }
      }
    },
    {
      id: "giant-life",
      manufacturer: "giant",
      label: "motor.giant-life",
      image: "images/giant-syncdrive-life.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 3,
      result: {
        compatible: true,
        product: {
          name: "product.giant-syncdrive.title",
          image: "images/redped-3-giant-syncdrive.webp",
          url: "https://redped.de/products/redped-3-fur-giant-syncdrive-pro-sport-life-core-tuning-e-bike"
        }
      }
    },
    {
      id: "giant-core",
      manufacturer: "giant",
      label: "motor.giant-core",
      image: "images/giant-syncdrive-core.webp",
      imageFit: "contain",
      imageZoom: false,
      hideLabel: true,
      order: 4,
      result: {
        compatible: true,
        product: {
          name: "product.giant-syncdrive.title",
          image: "images/redped-3-giant-syncdrive.webp",
          url: "https://redped.de/products/redped-3-fur-giant-syncdrive-pro-sport-life-core-tuning-e-bike"
        }
      }
    },
    {
      id: "giant-unknown",
      manufacturer: "giant",
      label: "motor.giant-unknown",
      mark: "?",
      order: 5,
      questions: [
        {
          id: "giantConnector",
          title: "question.giant-connector.title",
          help: "question.giant-connector.help",
          options: [
            {
              id: "sport",
              label: "option.giant-connector.sport",
              image: "images/giant-syncdrive-sport-connectors.webp",
              imageFit: "contain",
              imageZoom: false,
              hideLabel: true,
              targetMotor: "giant-sport"
            },
            {
              id: "sport2",
              label: "option.giant-connector.sport2",
              image: "images/giant-syncdrive-sport2-connectors.webp",
              imageFit: "contain",
              imageZoom: false,
              hideLabel: true
            }
          ]
        }
      ],
      results: [
        {
          compatible: false,
          when: { answer: "giantConnector", equals: "sport2" },
          title: "result.giant-sport2"
        }
      ]
    },
    {
      id: "giant-other",
      manufacturer: "giant",
      label: "motor.giant-other",
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
          image: "images/shimano-ep801-ep6-connectors.webp",
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
