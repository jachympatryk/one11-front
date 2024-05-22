export const mapAttendanceStatus = (status: string): string => {
  switch (status) {
    case 'CONFIRMED':
      return 'Potwierdzony';
    case 'ABSENT':
      return 'Nieobecny';
    case 'LATE':
      return 'Spóźniony';
    case 'EXCUSED':
      return 'Usprawiedliwiony';
    case 'PENDING':
      return 'Oczekujący';
    default:
      return 'Nieznany';
  }
};
