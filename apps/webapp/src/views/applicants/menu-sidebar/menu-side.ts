import MenuItemInterface from '../../../interfaces/MenuItemInterface';
import { Paths } from '../../../utils/paths';
import SvgIcons from '../../../utils/iconsEnums';
export const options: MenuItemInterface[] = [
  {
    label: 'Inicio',
    path: Paths.Applicants.Home,
    icon: SvgIcons.HouseSimple,
    activeIcon: SvgIcons.HouseSimpleViolet,
  },
  {
    label: 'Mi cuenta',
    path: Paths.Applicants.MyAccount,
    icon: SvgIcons.UserCircle,
    activeIcon: SvgIcons.UserCircleViolet,
  },
  {
    label: 'Oferta Académica',
    path: Paths.Applicants.AcademicOffer,
    icon: SvgIcons.Student,
    activeIcon: SvgIcons.StudentViolet,
  },
];
