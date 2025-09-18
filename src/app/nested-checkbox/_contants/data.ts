export const nestedCheckbox = [
  {
    id: 1,
    label: "Label One",
    children: [
      {
        id: 11,
        label: "Child 1.1",
        children: [
          {
            id: 111,
            label: "Grandchild 1.1.1",
          },
          {
            id: 112,
            label: "Grandchild 1.1.2",
          },
        ],
      },
      {
        id: 12,
        label: "Child 1.2",
        children: [
          {
            id: 121,
            label: "Grandchild 1.2.1",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Label Two",
    children: [
      {
        id: 21,
        label: "Child 2.1",
      },
      {
        id: 22,
        label: "Child 2.2",
        children: [
          {
            id: 221,
            label: "Grandchild 2.2.1",
          },
          {
            id: 222,
            label: "Grandchild 2.2.2",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Label Three (no children)",
  },
];
