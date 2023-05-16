import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectApiUrl, setApiUrl } from '../../redux/slices/apiUrlSlice';
import { User } from '../../types/User';
import { ApiResponse } from '../../types/ApiResponse';
import { UserCard } from '../UserCard/UserCard';
import { INITIAL_API_URL } from '../constants';

import './Users.scss';

export const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const apiUrl = useAppSelector(selectApiUrl);

  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  useEffect(() => {
    if (apiUrl.url !== INITIAL_API_URL) {
      dispatch(setApiUrl({ apiUrl: { url: INITIAL_API_URL } }));
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    apiUrl.url &&
      fetch(apiUrl.url)
        .then(res => res.json())
        .then((res: ApiResponse) => {
          if (!res.links.next_url) {
            setIsButtonVisible(false);
          }

          if (apiUrl.url !== INITIAL_API_URL) {
            setVisibleUsers(prevUsers => [...prevUsers, ...res.users]);
          } else {
            setVisibleUsers(res.users);
          }
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
  }, [apiUrl]);

  const loadMoreUsers = () => {
    if (apiUrl.url) {
      setIsLoading(true);

      fetch(apiUrl.url)
        .then(res => res.json())
        .then((res: ApiResponse) => {
          dispatch(setApiUrl({ apiUrl: { url: res.links.next_url } }));
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));

      setIsLoading(false);
    }
  };

  return (
    <section className="users" id="users">
      <div className="page-container">
        <div className="users__content">
          <h1 className="registration__title">Working with GET request</h1>

          <div className="users__list">
            {visibleUsers &&
              visibleUsers.map(user => <UserCard user={user} key={user.id} />)}
          </div>

          {isLoading ? (
            <TailSpin
              height="80"
              width="80"
              color="#00BDD3"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            isButtonVisible && (
              <button
                className="button-template users__button"
                onClick={loadMoreUsers}>
                Show more
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};
