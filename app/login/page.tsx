import { login, signup } from "./actions";

export default function LoginPage() {
  return <main className="auth-shell">
    <div className="auth-card">
      <div className="brand"><span className="brand-mark">S</span> SellerGenly</div>
      <h1>Welcome back</h1><p>Create an account or sign in to your workspace.</p>
      <form>
        <label>Email<input name="email" type="email" required placeholder="you@example.com"/></label>
        <label>Password<input name="password" type="password" required minLength={6} placeholder="••••••••"/></label>
        <div className="auth-actions"><button formAction={login} className="btn primary">Log in</button><button formAction={signup} className="btn ghost">Create account</button></div>
      </form>
      <small>Authentication is handled securely by Supabase.</small>
    </div>
  </main>;
}
