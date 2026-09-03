const pens = [
  {
    id: "pen-01",
    name: "Classmate LOOP",
    price: 20,
    brand: "CLASSMATE",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-02",
    name: "Reynolds JETTER",
    price: 30,
    brand: "REYNOLDS",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-03",
    name: "Uniball MFB",
    price: 20,
    brand: "LINC",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-04",
    name: "Doms INXTRA",
    price: 5,
    brand: "DOMS",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 5,
        price: 22,
      },
      {
        quantity: 10,
        price: 43,
      },
    ],
  },

  {
    id: "pen-05",
    name: "Doms INXTRA",
    price: 5,
    brand: "DOMS",
    type: "BALL",
    color: "BLACK",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 10,
        price: 43,
      },
    ],
  },

  {
    id: "pen-06",
    name: "Doms INXIFY",
    price: 5,
    brand: "DOMS",
    type: "GEL",
    color: "BLUE",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 5,
        price: 22,
      },
    ],
  },

  {
    id: "pen-07",
    name: "Butterflow",
    price: 10,
    brand: "CELLO",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-08",
    name: "HAUZER TRENT",
    price: 60,
    brand: "HAUZER",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-09",
    name: "ADD METAL",
    price: 15,
    brand: "ADD",
    type: "GEL BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-10",
    name: "ADD METAL",
    price: 10,
    brand: "ADD",
    type: "GEL BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-11",
    name: "Classmate OCTANE FOUNTAIN INK PEN",
    price: 38,
    brand: "CLASSMATE",
    type: "INK",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-12",
    name: "DOMS EVERYDAY",
    price: 5,
    brand: "DOMS",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 20,
        price: 80,
      },
    ],
  },

  {
    id: "pen-13",
    name: "UNOMAX KENT",
    price: 75,
    brand: "UNOMAX",
    type: "Liquid Ball",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-14",
    name: "HAUZER COSMO",
    price: 100,
    brand: "HAUZER",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-15",
    name: "GLITER PEN",
    price: 85,
    brand: "GOLDEX",
    type: "GLITER GEL PEN",
    color: "10 Colours",
    category: "Pens & Writing",
  },

  {
    id: "pen-16",
    name: "HAUZER Auto Click",
    price: 10,
    brand: "HAUZER",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 10,
        price: 85,
      },
    ],
  },

  {
    id: "pen-17",
    name: "HAUZER Auto Click",
    price: 10,
    brand: "HAUZER",
    type: "BALL",
    color: "BLACK",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 10,
        price: 85,
      },
    ],
  },

  {
    id: "pen-18",
    name: "Pentonic",
    price: 10,
    brand: "LINC",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 10,
        price: 85,
      },
    ],
  },

  {
    id: "pen-19",
    name: "Pentonic",
    price: 10,
    brand: "LINC",
    type: "BALL",
    color: "BLACK",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 10,
        price: 85,
      },
    ],
  },

  {
    id: "pen-20",
    name: "Pentonic",
    price: 10,
    brand: "LINC",
    type: "BALL",
    color: "RED",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 10,
        price: 85,
      },
    ],
  },

  {
    id: "pen-21",
    name: "Pentonic",
    price: 10,
    brand: "LINC",
    type: "BALL",
    color: "GREEN",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 10,
        price: 85,
      },
    ],
  },

  {
    id: "pen-22",
    name: "Classmate UAO",
    price: 10,
    brand: "CLASSMATE",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-23",
    name: "LINC SIGNETTA AERO",
    price: 15,
    brand: "LINC",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-24",
    name: "HAUZER XO",
    price: 10,
    brand: "HAUZER",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-25",
    name: "FLAIR MOVE",
    price: 10,
    brand: "FLAIR",
    type: "GEL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-26",
    name: "FLAIR MOVE",
    price: 10,
    brand: "FLAIR",
    type: "GEL",
    color: "BLACK",
    category: "Pens & Writing",
  },

  {
    id: "pen-27",
    name: "LINC GLYCER",
    price: 10,
    brand: "LINC",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 5,
        price: 42,
      },
    ],
  },

  {
    id: "pen-28",
    name: "LINC GLYCER",
    price: 10,
    brand: "LINC",
    type: "BALL",
    color: "BLACK",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 5,
        price: 42,
      },
    ],
  },

  {
    id: "pen-29",
    name: "Classmate OCTANE",
    price: 10,
    brand: "CLASSMATE",
    type: "GEL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-30",
    name: "Classmate OCTANE",
    price: 10,
    brand: "CLASSMATE",
    type: "BALL",
    color: "BLACK",
    category: "Pens & Writing",
  },

  {
    id: "pen-31",
    name: "Classmate OCTANE",
    price: 10,
    brand: "CLASSMATE",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-32",
    name: "Goldex HALOGEN",
    price: 10,
    brand: "GOLDEX",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-33",
    name: "Goldex HALOGEN",
    price: 10,
    brand: "GOLDEX",
    type: "BALL",
    color: "BLACK",
    category: "Pens & Writing",
  },

  {
    id: "pen-34",
    name: "Goldex HALOGEN",
    price: 10,
    brand: "GOLDEX",
    type: "BALL",
    color: "RED",
    category: "Pens & Writing",
  },

  {
    id: "pen-35",
    name: "FLAIR WOODY",
    price: 10,
    brand: "FLAIR",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-36",
    name: "SUPRA DYNAMIQ",
    price: 10,
    brand: "SUPRA",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-37",
    name: "SUPRA MIDAZ",
    price: 10,
    brand: "SUPRA",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-38",
    name: "4 IN one pen",
    price: 20,
    brand: "4 IN ONE",
    type: "BALL",
    color: "BLUE BLACK RED GREEN",
    category: "Pens & Writing",
  },

  {
    id: "pen-39",
    name: "Reynold JIFFY Gel",
    price: 7,
    brand: "REYNOLDS",
    type: "GEL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-40",
    name: "Goldex LINER",
    price: 5,
    brand: "GOLDEX",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-41",
    name: "DAIZY",
    price: 5,
    brand: "DAIZY",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-42",
    name: "LINC MAXO",
    price: 5,
    brand: "LINC",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-43",
    name: "LIKHO PHEKO",
    price: 3,
    brand: "LIKHO PHEKO",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-44",
    name: "LIKHO PHEKO",
    price: 3,
    brand: "LIKHO PHEKO",
    type: "BALL",
    color: "BLACK",
    category: "Pens & Writing",
  },

  {
    id: "pen-45",
    name: "LIKHO PHEKO",
    price: 3,
    brand: "LIKHO PHEKO",
    type: "BALL",
    color: "RED",
    category: "Pens & Writing",
  },
];

export default pens;