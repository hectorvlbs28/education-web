import { Routes, Route } from 'react-router-dom';
import LeftDrawer from '../../components/uikit/leftdrawer/leftdrawer';
import { Paths } from '../../utils/paths'
import { options } from './menu-sidebar/menu-side';
import Home from './home/Home'
import MyAccount from './my-account/MyAccount'
import AcademicOffer from './academic-offer/AcademicOffer'
export function RouteApplicants() {


  return (
    
        <Route element={<LeftDrawer menu={options} />}>
          <Route path={Paths.Applicants.Home} element={<Home />} />
          <Route
            path={Paths.Applicants.MyAccount}
            element={<MyAccount />}
          />
          <Route
            path={Paths.Applicants.AcademicOffer}
            element={<AcademicOffer />}
          />
        </Route>
  );
}

export default RouteApplicants;
