import { Offer } from '../../types/offer';
import {Link, useNavigate } from 'react-router-dom';
import capitalizeFirstLetter from '../../helper-functions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addFavoritePlaceAction } from '../../store/api-actions';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../const';
import { AppRoute } from '../../const';
import { fetchFavoritePlacesAction } from '../../store/api-actions';
type CardItemProps = {
  offer: Offer;
  onMouseOver?: (offerId: Offer) => void;
  className: {
    article: string;
    img: string;
    info: string;
    imgHeight?: string;
    imgWidth?: string;
    isPremiumBlockShow?: boolean;
  };
};

function CardItem(props: CardItemProps): JSX.Element {
  const navigate = useNavigate();
  const { offer, onMouseOver, className} = props;
  const { isPremium, price, title, type, previewImage, rating, id } = offer;
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const addToFavoritesHandler = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }
    dispatch(addFavoritePlaceAction({hotelId: offer.id, status: !isFavorite}));
    setIsFavorite(!isFavorite);
    dispatch(fetchFavoritePlacesAction());
  };

  return (
    <article className={`${className.article} place-card`} onMouseOver={() => onMouseOver && onMouseOver(offer)}>
      {isPremium && (className.isPremiumBlockShow === undefined || className.isPremiumBlockShow) ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : null}
      <div className={`${className.img} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={ className.imgWidth ? className.imgWidth : '260'}
            height={ className.imgHeight ? className.imgHeight : '200'}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${className.img} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button  ${ isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button" onClick={addToFavoritesHandler}>
            <svg className="place-card__bookmark-icon " width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.floor(rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}

export default CardItem;
