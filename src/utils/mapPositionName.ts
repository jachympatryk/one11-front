export const mapPositionName = (
  position: string,
  plural: boolean = false
): string => {
  switch (position) {
    case 'GOALKEEPER':
      return plural ? 'bramkarze' : 'bramkarz';
    case 'DEFENDER':
      return plural ? 'obrońcy' : 'obrońca';
    case 'MIDFIELDER':
      return plural ? 'pomocnicy' : 'pomocnik';
    case 'STRIKER':
      return plural ? 'napastnicy' : 'napastnik';
    default:
      return plural ? 'nieznane' : 'nieznana';
  }
};
