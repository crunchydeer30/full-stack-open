const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <section>
      <h1>Log In to Application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Log In</button>
      </form>
    </section>
  );
};

export default LoginForm;
