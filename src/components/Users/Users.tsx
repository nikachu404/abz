import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setApiUrl, selectApiUrl } from '../../redux/slices/apiUrl';
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
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (apiUrl.url) {
          const res = await axios.get(apiUrl.url);
          const data: ApiResponse = res.data;

          if (!data.links.next_url) {
            setIsButtonVisible(false);
          }

          if (apiUrl.url !== INITIAL_API_URL) {
            setVisibleUsers(prevUsers => [...prevUsers, ...data.users]);
          } else {
            setVisibleUsers(data.users);
          }
        }
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    if (apiUrl.url) {
      fetchData();
    }
  }, [apiUrl]);

  const loadMoreUsers = async () => {
    if (apiUrl.url) {
      setIsLoading(true);

      try {
        const res = await axios.get(apiUrl.url);
        const data: ApiResponse = res.data;

        dispatch(setApiUrl({ apiUrl: { url: data.links.next_url } }));
      } catch (error) {
        console.error(error);
      }

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
