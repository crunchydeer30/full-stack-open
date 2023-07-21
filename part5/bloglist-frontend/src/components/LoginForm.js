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
          <label htmlFor="username">Username: </label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button>Log In</button>
      </form>
    </section>
  );
};

export default LoginForm;
