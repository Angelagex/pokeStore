export const gePokemonPrice = (rarity: string) => {
  switch (rarity) {
    case "Amazing Rare":
      return 450;
      break;
    case "Common":
      return 80;
      break;
    case "LEGEND":
      return 1200;
      break;
    case "Promo":
      return 550;
      break;
    case "Rare":
      return 280;
      break;
    case "Rare ACE":
      return 300;
      break;
    case "Rare BREAK":
      return 320;
      break;
    case "Rare Holo":
      return 550;
      break;
    case "Rare Holo EX":
      return 750;
      break;
    case "Rare Holo GX":
      return 780;
      break;
    case "Rare Holo LV.X":
      return 800;
      break;
    case "Rare Holo Star":
      return 900;
      break;
    case "Rare Holo V":
      return 800;
      break;
    case "Rare Holo VMAX":
      return 950;
      break;
    case "Rare Prime":
      return 800;
      break;
    case "Rare Prism Star":
      return 750;
      break;
    case "Rare Rainbow":
      return 900;
      break;
    case "Rare Secret":
      return 1000;
      break;
    case "Rare Shining":
      return 850;
      break;
    case "Rare Shiny":
      return 900;
      break;
    case "Rare Shiny GX":
      return 1000;
      break;
    case "Rare Ultra":
      return 1000;
      break;
    case "Uncommon":
      return 180;
      break;
    default:
      return 200;
      break;
  }
};
