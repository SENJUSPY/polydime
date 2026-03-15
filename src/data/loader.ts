export const loadMaterials = async (course: string, branch: string) => {
  // Simulate API call
  return [
    {
      id: 'm1',
      title: 'Engineering Mathematics-I',
      type: 'Textbook',
      subject: 'Mathematics',
      semester: '1st Semester',
      filename: 'math1.pdf'
    },
    {
      id: 'm2',
      title: 'Programming in C',
      type: 'Notes',
      subject: 'Computer Science',
      semester: '1st Semester',
      filename: 'c_prog.pdf'
    },
    {
      id: 'm3',
      title: 'Engineering Physics',
      type: 'Textbook',
      subject: 'Physics',
      semester: '1st Semester',
      filename: 'physics.pdf'
    }
  ];
};
