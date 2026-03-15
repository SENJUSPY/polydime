export const loadMaterials = async (course: string, branch: string) => {
  // Mock data for now
  return [
    {
      id: '1',
      title: 'Engineering Mathematics I',
      filename: 'math1.pdf',
      subject: 'Mathematics',
      semester: 'Semester 1',
      type: 'PDF'
    },
    {
      id: '2',
      title: 'Programming in C',
      filename: 'c_prog.pdf',
      subject: 'Computer Science',
      semester: 'Semester 1',
      type: 'PDF'
    }
  ];
};
