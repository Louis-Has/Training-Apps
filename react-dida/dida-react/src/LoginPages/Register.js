export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form action="" method="POST">
        <div>
          Username:
          <input type="text" name="name" />
        </div>
        <div>
          Email:
          <input type="text" name="email" />
        </div>
        <div>
          Password:
          <input type="password" name="password" />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
}

