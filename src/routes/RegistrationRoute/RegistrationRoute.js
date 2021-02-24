import React from 'react';
import { useHistory } from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

function RegistrationRoute() {

  const history = useHistory();

  const handleRegistrationSuccess = () => {
    history.push('/')
  }

    return (
      <section>
        <p>
          Practice learning a language with the spaced repetition revision technique.
        </p>
        <h2>Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={() => {
            handleRegistrationSuccess();
          }}
        />
      </section>
    );
}

export default RegistrationRoute;
