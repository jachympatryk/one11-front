export const mapAttendanceStatus = (status: string): string => {
  switch (status) {
    case 'CONFIRMED':
      return 'potwierdzony';
    case 'ABSENT':
      return 'nieobecny';
    case 'LATE':
      return 'spóźniony';
    case 'EXCUSED':
      return 'usprawiedliwiony';
    case 'PENDING':
      return 'oczekujący';
    default:
      return 'nieznany';
  }
};
