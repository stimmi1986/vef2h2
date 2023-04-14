import Link from 'next/link';
import PropTypes from 'prop-types';

interface LoginProps {
  loggedin?: boolean;
  name?: string;
  onRegister?: () => void;
  onLogout?: () => void;
}

export function Login({
  loggedin = false,
  name,
  onRegister,
  onLogout,
}: LoginProps) {
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
        <Link href="/login">Innskráning</Link>
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
