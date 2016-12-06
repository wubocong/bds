const teacher = {
  _id: '123',
  name: '潘教授',
  account: 'teacher',
  studentIds: ['studne1', 'studnwe2'],
  defenses: [
    {
      _id: 'defense1',
      status: 1,
      name: '计算机科学与技术5',
      time: new Date(2384321947891274),
      address: '华南农业大学第三教学楼333',
      studentIds: ["12", "!23", "!23"],
      leaderId: '123',
      teachers: [
        {
          _id: '123',
          name: '潘教授'
        },
        {
          _id: '213',
          name: '鸿教授'
        },
        {
          _id: '211233',
          name: '仪教授'
        }
      ]
    },
    {
      _id: 'defense1',
      status: 1,
      name: '计算机科学与技术5',
      time: new Date - 0,
      address: '华南农业大学第三教学楼333',
      studentIds: ["12", "!23", "!23"],
      leaderId: '123',
      teachers: [
        {
          _id: '123',
          name: '潘教授'
        },
        {
          _id: '213',
          name: '鸿教授'
        },
        {
          _id: '211233',
          name: '仪教授'
        }
      ]
    },
    {
      _id: 'defense1',
      status: 2,
      name: '计算机科学与技术51',
      time: new Date - 0,
      address: '华南农业大学第三教学楼333',
      studentIds: ["12", "!23", "!23"],
      leaderId: '2121',
      teachers: [
        {
          _id: '123',
          name: '潘教授'
        },
        {
          _id: '213',
          name: '鸿教授'
        },
        {
          _id: '211233',
          name: '仪教授'
        }
      ]
    }
  ]
};

export default teacher;