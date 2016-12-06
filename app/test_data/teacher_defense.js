const defense = {
  _id: 'defense',
  status: 1,
  name: '计算机科学与技术',
  time: new Date - 0,
  address: '华南农业大学 第三教学楼 303',
  finished: 1,
  leaderId: 'leader',
  teachers: [
    {
      _id: 'leader',
      name: '潘老师'
    },
    {
      _id: 'fajdskfhd',
      name: '李老师'
    },
    {
      _id: 'ledsfadader',
      name: '潘老师'
    }
  ],
  students: [
    {
      _id: "student",
      name: "mebtte",
      account: '201330302523',
      paper: {
        name: "宠物管家APP"
      },
      teacher: {
        name: 'mebtte',
        posTitle: '教授'
      }
    },
    {
      _id: "student",
      name: "mebtte",
      account: '201330302523',
      paper: {
        name: "宠物管家APP",
        finalScore: 90
      },
      teacher: {
        name: 'mebtte',
        posTitle: '教授'
      }
    }
  ]
};

export default defense;