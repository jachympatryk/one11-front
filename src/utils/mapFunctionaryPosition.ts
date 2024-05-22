export const mapFunctionaryPosition = (position: string): string => {
  switch (position) {
    case 'PRESIDENT':
      return 'Prezes';
    case 'COACH':
      return 'Trener';
    case 'MANAGEMENT':
      return 'Zarząd';
    case 'OTHER':
      return 'Inny';
    case 'HEALTHCARE':
      return 'Opieka medyczna';
    default:
      return 'Nieznany';
  }
};
