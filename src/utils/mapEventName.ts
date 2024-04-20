export const mapEventName = (event: string): string => {
  switch (event) {
    case 'MATCH':
      return 'mecz';
    case 'TRAINING':
      return 'trening';
    case 'OTHER':
      return 'inne';
    case 'MEETING':
      return 'spotkanie';
    default:
      return 'nieznane';
  }
};
