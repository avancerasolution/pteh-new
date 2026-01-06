export const futureETHOSData = [
  {
    section: "Roofless",
    items: [
      {
        no: "1",
        operational: {
          title: "People living rough",
          bullets: ["Male", "Female", "Bermudian", "Non-Bermudian"],
        },
        code: "1.1",
        living: "Public space or external space",
        definition:
          "Living in the streets or public spaces, without a secure shelter that can be defined as living quarters.",
        y2021: 70,
        y2022: 68,
      },
      {
        no: "2",
        operational: "People staying in a night shelter",
        code: "2.1",
        living: "Night shelter",
        definition: "People with no usual place of residence who make use of overnight shelter, low threshold shelter.",
        y2021: 33,
        y2022: 46,
      },
    ],
  },

  {
    section: "Houseless",
    items: [
      {
        no: "3",
        operational: "People in accommodation for the homeless",
        rows: [
          {
            code: "3.1",
            living: "Homeless hostel",
          },
          {
            code: "3.2",
            living: "Temporary accommodation",
          },
          {
            code: "3.3",
            living: "Transitional supported accommodation",
          },
        ],
        definition: "Where the period of stay is intended to be short term.",
        y2021: 166,
        y2022: 169,
      },
      {
        no: "4",
        operational: "People in a women’s shelter",
        code: "4.1",
        living: "Women’s shelter accommodation",
        definition:
          "Women accommodated due to experience of domestic violence and where the period of stay is intended to be short term.",
        y2021: 3,
        y2022: 10,
      },
      {
        no: "5",
        operational: "People in accommodation for immigrants",
        rows: [
          {
            code: "5.1",
            living: "Temporary accommodation, reception centres",
          },
          {
            code: "5.2",
            living: "Migrant workers’ accommodation",
          },
        ],
        definition: "Immigrants in reception or short-term accommodation due to their immigrant status.",
        y2021: 2,
        y2022: 17,
      },
      {
        no: "6",
        operational: "People due to be released from institutions",
        rows: [
          { code: "6.1", living: "Penal institutions" },
          { code: "6.2", living: "Medical institutions" },
        ],
        definition: "No housing available prior to release. Stay longer than needed due to lack of housing.",
        y2021: 60,
        y2022: 65,
      },
      {
        no: "7",
        operational: {
          title: "People receiving longer-term support",
          bullets: ["Male", "Female"],
        },
        rows: [
          { code: "7.1", living: "Residential care for older homeless people" },
          {
            code: "7.2",
            living: "Supported accommodation for a formerly homeless person. Receiving services for over 2 years.",
          },
        ],
        definition: "Living in the streets or public spaces, without a secure shelter.",
        y2021: 20,
        y2022: 37,
      },
    ],
  },

  {
    section: "Insecure housing",
    items: [
      {
        no: "8",
        operational: "People living in insecure accommodation",
        rows: [
          { code: "8.1", living: "Temporarily with family/friends" },
          { code: "8.2", living: "No legal (sub) tenancy" },
          { code: "8.3", living: "Illegal occupation of land" },
        ],
        definition: "Living in conventional housing but not the usual place of residence due to lack of housing.",
        y2021: 20,
        y2022: 37,
      },
      {
        no: "9",
        operational: "People living under threat of eviction",
        rows: [
          { code: "9.1", living: "Legal orders enforced (rented)" },
          { code: "9.2", living: "Repossession orders (owned)" },
        ],
        definition: "Where orders for eviction are operative or mortgagee has legal order to repossess.",
        y2021: 21,
        y2022: 15,
      },
      {
        no: "10",
        operational: "People living under threat of violence",
        rows: [
          {
            code: "10.1",
            living: "Police recorded incidents (violence, victims, criminal activity)",
          },
        ],
        definition: "Where police action is taken to ensure place of safety for victims of domestic violence.",
        y2021: 5,
        y2022: 4,
      },
    ],
  },

  {
    section: "Inadequate housing",
    items: [
      {
        no: "11",
        operational: "People living in temporary/non-conventional structures",
        rows: [
          { code: "11.1", living: "Mobile homes" },
          { code: "11.2", living: "Non-conventional building" },
          { code: "11.3", living: "Temporary structure" },
        ],
        definition: "Not intended as place of usual residence (shack, shanty, hut).",
        y2021: 20,
        y2022: 29,
      },
      {
        no: "12",
        operational: "People living in extreme overcrowding",
        code: "12.1",
        living: "Occupied dwelling unfit for habitation",
        definition: "Defined as unfit for habitation by national legislation or building regulations.",
        y2021: 50,
        y2022: 64,
      },
      {
        no: "13",
        operational: "People living in extreme overcrowding",
        code: "13.1",
        living: "Highest national norm of overcrowding",
        definition: "Defined as exceeding national density standard for floor-space or usable rooms.",
        y2021: 20,
        y2022: 36,
      },
    ],
  },
];

export const tableFooter = {
  note: "Short stay is defined as normally less than one year. Long stay is defined as more than one year. (*) Includes drug rehabilitation institutions, psychiatric hospitals etc.",
  total2021: 555,
  total2022: 650,
};
