function total() {
  //@ts-ignore
  return this.upd.length - this.dissd.length;
}

export var items = [
  {
    id: "1",
    title: "high fifty",
    price: 50,
    score: {
      total,
      upd: ["ben", "ben", "ben", "deafcat", "deafcat", "deafcat"],
      dissd: ["james", "lilly", "lilly"],
    },
  },
  {
    id: "2",
    title: "Up'd state",
    price: 100,
    score: {
      total,
      upd: ["mike", "mike"],
      dissd: [],
    },
  },
  {
    id: "3",
    title: "lego",
    price: 200,
    score: {
      total,
      upd: ["lilly", "deafcat", "deafcat", "mike", "aeon"],
      dissd: [],
    },
  },
  {
    id: "4",
    title: "lego",
    price: 45,
    score: {
      total,
      upd: [],
      dissd: ["lilly"],
    },
  },
  {
    id: "5",
    title: "lego",
    price: 75,
    score: {
      total,
      upd: ["aeon"],
      dissd: [],
    },
  },
];
