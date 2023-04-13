import PropTypes from 'prop-types';

export function Login({
  loggedin = false,
  name,
  onRegister,
  onLogout,
}) {
  if (loggedin) {
    return (
      <>
        <p>
          Skráður inn sem <strong>{name}</strong>
        </p>
        <button onClick={onLogout}>Útskrá</button>
      </>
    );
  }

  return (
    <>
      <p>
        <a href="/login">Innskráning</a>
      </p>
      <p>
        <button onClick={onRegister}>Nýskráning</button>
      </p>
    </>
  );
}

Login.propTypes = {
  loggedin: PropTypes.bool,
  onRegister: PropTypes.func,
  onLogout: PropTypes.func,
  name: PropTypes.string,
};
