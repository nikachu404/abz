import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import { useAppDispatch } from '../../redux/hooks';
import { InputField } from '../InputField/InputField';
import { setApiUrl } from '../../redux/slices/apiUrlSlice';
import {
  validateName,
  validatePhone,
  validateEmail,
  registerUser,
} from '../../helpers/';
import { INITIAL_API_URL } from '../constants';

import './Registration.scss';

const positions = [
  { id: '1', name: 'Lawyer', label: 'Lawyer' },
  { id: '2', name: 'Content manager', label: 'Content manager' },
  { id: '3', name: 'Security', label: 'Security' },
  { id: '4', name: 'Designer', label: 'Designer' },
];

const initialState = {
  position: '',
  photoName: 'Upload your photo',
  isTouchedInputs: { name: false, email: false, phone: false },
  positionId: '',
  name: '',
  email: '',
  phone: '+380',
  photo: '' as File | string,
};

export const Registration: React.FC = () => {
  const [state, setState] = useState(initialState);
  const [isRegistrationSuccess, seIsRegistrationSuccess] = useState(false);
  const [isRegistrationError, seIsRegistrationError] = useState(false);

  const {
    position,
    photoName,
    isTouchedInputs,
    positionId,
    name,
    email,
    phone,
    photo,
  } = state;

  const dispatch = useAppDispatch();

  const isNameCorrect = validateName(name);
  const isEmailCorrect = validateEmail(email);
  const isPhoneCorrect = validatePhone(phone);

  const isSubmitButtonEnabled =
    isNameCorrect && isEmailCorrect && isPhoneCorrect && positionId && photo;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof initialState,
    id?: string,
  ) => {
    setState(prevState => ({ ...prevState, [key]: event.target.value }));

    if (id) {
      setState(prevState => ({ ...prevState, positionId: id }));
    }
  };

  const handleBlur = (key: string) => {
    setState(prevState => ({
      ...prevState,
      isTouchedInputs: { ...prevState.isTouchedInputs, [key]: true },
    }));
  };

  function handlePositionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedPosition = positions.find(pos => pos.id === event.target.id);
    if (selectedPosition) {
      setState(prevState => ({
        ...prevState,
        position: selectedPosition.label,
        positionId: selectedPosition.id,
      }));
    }
  }

  function handlePhotoInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setState(prevState => ({
        ...prevState,
        photo: selectedFile,
      }));
    }
    if (selectedFile?.name) {
      setState(prevState => ({
        ...prevState,
        photoName: selectedFile.name,
      }));
    }
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isNameCorrect || !isEmailCorrect || !isPhoneCorrect) {
      return;
    }

    try {
      await registerUser(positionId, name, email, phone, photo);
      dispatch(
        setApiUrl({
          apiUrl: {
            url: INITIAL_API_URL,
          },
        }),
      );
      seIsRegistrationSuccess(true);
      setTimeout(() => seIsRegistrationSuccess(false), 3000);
      seIsRegistrationError(false);
      clearForm();
    } catch {
      seIsRegistrationError(true);
    }
  };

  const clearForm = () => {
    setState(initialState);
  };

  return (
    <div className="registration" id="sign-up">
      <div className="registration__content">
        <h1 className="registration__title">
          {isRegistrationSuccess
            ? 'User successfully registered'
            : ' Working with POST request'}
        </h1>

        {isRegistrationSuccess ? (
          <div className="registration__success" />
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="registration__input-area">
              <InputField
                label="Your name"
                value={name}
                isTouched={isTouchedInputs.name}
                isValid={isNameCorrect}
                errorMessage="Please enter a valid name"
                onChange={event => handleInputChange(event, 'name')}
                onBlur={() => handleBlur('name')}
              />

              <InputField
                label="Email"
                value={email}
                isTouched={isTouchedInputs.email}
                isValid={isEmailCorrect}
                errorMessage="Please enter a valid email"
                onChange={event => handleInputChange(event, 'email')}
                onBlur={() => handleBlur('email')}
              />

              <InputField
                label="Phone number"
                value={phone}
                isTouched={isTouchedInputs.phone}
                isValid={isPhoneCorrect}
                onChange={event => handleInputChange(event, 'phone')}
                onBlur={() => handleBlur('phone')}
                helperText="+38 (XXX) XXX - XX - XX"
              />
            </div>

            <div className="registration__position">
              <p className="registration__position-title">
                Select your position
              </p>
              <div className="registration__position-options">
                {positions.map(({ id, name, label }) => (
                  <label key={id} className="registration__radio-label">
                    <input
                      id={id}
                      type="radio"
                      onChange={handlePositionChange}
                      checked={position === name}
                      name={name}
                      className="registration__radiobutton"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="registration__input-photo">
              <div className="file has-name">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    accept="image/*"
                    name="photo"
                    onChange={handlePhotoInputChange}
                  />
                  <span className="file-cta">
                    <i className="fas fa-upload" />
                    <div className="file-label">Upload</div>
                  </span>
                  <div className="file-name">{photoName}</div>
                </label>
              </div>
            </div>

            <div className="registration__button-wrapper">
              <button
                type="submit"
                className="button-template registration__button"
                disabled={!isSubmitButtonEnabled}>
                Sign up
              </button>

              {isRegistrationError && (
                <h2 className="registration__error">
                  Something went wrong. Please, try again.
                </h2>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
