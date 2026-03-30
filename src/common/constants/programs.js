export const USER_TYPES = {
  EMPLOYEE: 'employee',
  STUDENT: 'student',
};

export const PROGRAM_KEYS = {
  OC_ALL_IN: 'ocAllIn',
  PROFESSIONAL_LEARNING_CENTER: 'professionalLearningCenter',
  FITNESS_CHALLENGE: 'fitnessChallenge',
  DRIVE_TO_SUCCESS: 'driveToSuccess',
};

export const PROGRAM_LABELS = {
  [PROGRAM_KEYS.OC_ALL_IN]: 'OC All-In',
  [PROGRAM_KEYS.PROFESSIONAL_LEARNING_CENTER]:
    'Professional Learning Center',
  [PROGRAM_KEYS.FITNESS_CHALLENGE]: 'Fitness Challenge',
  [PROGRAM_KEYS.DRIVE_TO_SUCCESS]: 'Drive to Success',
};

export const EMPLOYEE_PROGRAMS = [
  {
    key: PROGRAM_KEYS.OC_ALL_IN,
    label: PROGRAM_LABELS[PROGRAM_KEYS.OC_ALL_IN],
    description: 'Please log in to access the employee reward program',
    menuKey: 'OC',
  },
  {
    key: PROGRAM_KEYS.PROFESSIONAL_LEARNING_CENTER,
    label: PROGRAM_LABELS[PROGRAM_KEYS.PROFESSIONAL_LEARNING_CENTER],
    description: 'Please log in to access the PLC credits',
    menuKey: 'PLC',
  },
  {
    key: PROGRAM_KEYS.FITNESS_CHALLENGE,
    label: PROGRAM_LABELS[PROGRAM_KEYS.FITNESS_CHALLENGE],
    description: 'Please log in to access the fitness challenge',
    menuKey: 'FITNESS',
  },
];

export const STUDENT_PROGRAMS = [
  {
    key: PROGRAM_KEYS.DRIVE_TO_SUCCESS,
    label: PROGRAM_LABELS[PROGRAM_KEYS.DRIVE_TO_SUCCESS],
    description: 'Student success challenges and progress',
    menuKey: 'DTS',
  },
  {
    key: PROGRAM_KEYS.FITNESS_CHALLENGE,
    label: PROGRAM_LABELS[PROGRAM_KEYS.FITNESS_CHALLENGE],
    description: 'Student fitness challenge access',
    menuKey: 'FITNESS',
  },
];

export const PROGRAMS_BY_USER_TYPE = {
  [USER_TYPES.EMPLOYEE]: EMPLOYEE_PROGRAMS,
  [USER_TYPES.STUDENT]: STUDENT_PROGRAMS,
};

export const getProgramsForUserType = userType =>
  PROGRAMS_BY_USER_TYPE[userType] || [];
