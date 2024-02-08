import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
//import PrivateRoute from '../private-route';
import { Feedback } from '../../types/offer';
import { useAppSelector } from '../../hooks/useAppSelector';

type AppScreenProps = {
  feedbacks: Feedback[];
};

function App({ feedbacks }: AppScreenProps): JSX.Element {
  const offers = useAppSelector((state) => state.offersList);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<WelcomeScreen />}
        />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route
          path={AppRoute.Favorites}
          element={
            //<PrivateRoute hasAccess={false}>
            <FavoritesScreen offers={offers}/>
            //</PrivateRoute>
          }
        />
        <Route path={AppRoute.Room} element={<OfferScreen offers={offers} feedbacks={feedbacks}/>}/>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
