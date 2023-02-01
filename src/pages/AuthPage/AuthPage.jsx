import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LogInForm';

export default function AuthPage({setUser, form}) {
  return (
    <main>
      <h1>AuthPage</h1>
      <SignUpForm setUser={setUser}/>
      <LoginForm setUser={setUser}/>
    </main>
  );
}

