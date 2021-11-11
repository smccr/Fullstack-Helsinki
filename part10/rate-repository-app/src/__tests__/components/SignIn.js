import React from 'react';
import { SignInContainer } from '../../components/SignIn';
import { render, fireEvent, act } from '@testing-library/react-native';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(<SignInContainer onSubmit={onSubmit}/>);

      await act(async () => fireEvent.changeText(getByTestId('usernameField'), 'kalle'));

      await act(async () => fireEvent.changeText(getByTestId('passwordField'), 'password'));

      await act(async () => fireEvent.press(getByTestId('submitButton')));

      await act(async () => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});