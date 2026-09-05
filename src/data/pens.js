const pens = [
  {
    id: "pen-01",
    name: "Classmate LOOP",
    price: 20,
    brand: "CLASSMATE",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    image: "/images/pen/loop.jpg",
  },

  {
    id: "pen-02",
    name: "Reynolds JETTER",
    price: 30,
    brand: "REYNOLDS",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    image: "/images/pen/jetter.jpg",
  },

  {
    id: "pen-03",
    name: "Uniball MFB",
    price: 20,
    brand: "LINC",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
     image: "/images/pen/uniball.jpg",
  },

  {
    id: "pen-04",
    name: "Doms INXTRA set of 5 pieces",
    price: 23,
    brand: "DOMS",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    image: "/images/pen/inxtra.jpg",
  },

  {
    id: "pen-05",
    name: "Hauser KNOX",
    price: 20,
    brand: "Hauser",
    type: "Blue",
    color: "BLACK",
    category: "Pens & Writing",
    image: "/images/pen/KNOX.jpg",
  },

  {
    id: "pen-06",
    name: "Doms INXIFY set of 5 pieces",
    price: 23,
    brand: "DOMS",
    type: "GEL",
    color: "BLUE",
    category: "Pens & Writing",
    image: "/images/pen/inxify.jpg",
  },
  {
    id: "pen-46",
    name: "Doms INXIFY set of 5 pieces",
    price: 23,
    brand: "DOMS",
    type: "GEL",
    color: "black",
    category: "Pens & Writing",
    image: "/images/pen/inxifyb.jpg",
  },

  {
    id: "pen-07",
    name: "Butterflow 10rs per piece",
    price: 10,
    brand: "CELLO",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    image: "/images/pen/butterflow.jpg",
  },

  {
    id: "pen-08",
    name: "HAUZER TRENT",
    price: 60,
    brand: "HAUZER",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    image: "/images/pen/trent.jpg",
  },

  {
    id: "pen-11",
    name: "Classmate OCTANE FOUNTAIN INK PEN",
    price: 38,
    brand: "CLASSMATE",
    type: "INK",
    color: "BLUE",
    category: "Pens & Writing",
    image: "/images/pen/foctane.jpg",
  },

  {
    id: "pen-13",
    name: "UNOMAX KENT",
    price: 75,
    brand: "UNOMAX",
    type: "Liquid Ball",
    color: "BLUE",
    category: "Pens & Writing",
    image: "/images/pen/kent.jpg",
  },

  {
    id: "pen-14",
    name: "HAUZER COSMO",
    price: 100,
    brand: "HAUZER",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    image: "/images/pen/cosmo.jpg",
  },

  {
    id: "pen-15",
    name: "GLITER PEN",
    price: 85,
    brand: "GOLDEX",
    type: "GLITER GEL PEN",
    color: "10 Colours",
    category: "Pens & Writing",
    image: "/images/pen/gliter.jpg",
  },

  {
    id: "pen-16",
    name: "HAUZER Auto Click",
    price: 10,
    brand: "HAUZER",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    image: "/images/pen/autoclick.jpg",
  },

  {
    id: "pen-17",
    name: "HAUZER Auto Click",
    price: 10,
    brand: "HAUZER",
    type: "BALL",
    color: "BLACK",
    category: "Pens & Writing",
    image: "/images/pen/autoclickb.jpg",
  },

  {
    id: "pen-18",
    name: "Pentonic BLUE BALL",
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
    image: "/images/pen/pentonic.jpg",
  },

  {
    id: "pen-19",
    name: "Pentonic BALL BLACK",
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
    image: "/images/pen/pentonicb.jpg",
  },


  {
    id: "pen-20",
    name: "Pentonic GEL BLUE",
    price: 10,
    brand: "LINC",
    type: "GEL",
    color: "blue",
    category: "Pens & Writing",
    packOptions: [
      {
        quantity: 10,
        price: 85,
      },
    ],
    image: "/images/pen/pentonicr.jpg",
  },

  {
    id: "pen-21",
    name: "Pentonic GEL BLACK ",
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
    image: "/images/pen/pentonicg.jpg",
  },

  {
    id: "pen-23",
    name: "LINC SIGNETTA AERO 10rs per piece",
    price: 10,
    brand: "LINC",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
    image: "/images/pen/signetta.jpg",
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
    name: "LIKHO PHEKO pack of 5",
    price: 15,
    brand: "LIKHO PHEKO",
    type: "BALL",
    color: "BLUE",
    category: "Pens & Writing",
  },

  {
    id: "pen-44",
    name: "LIKHO PHEKO pack of 5",
    price: 15,
    brand: "LIKHO PHEKO",
    type: "BALL",
    color: "BLACK",
    category: "Pens & Writing",
  },

  {
    id: "pen-45",
    name: "LIKHO PHEKO Pack of 5",
    price: 15,
    brand: "LIKHO PHEKO",
    type: "BALL",
    color: "RED",
    category: "Pens & Writing",
  },
];

export default pens;