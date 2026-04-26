import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin login — StreamlixIPTV" };

export default function AdminLoginPage() {
  return (
    <main className="admin-login-shell">
      <div className="admin-login-bg" />
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <span>S</span>
        </div>
        <h1>Admin <span className="accent">access</span></h1>
        <p>Sign in to manage orders and settings.</p>
        <LoginForm />
      </div>
    </main>
  );
}
