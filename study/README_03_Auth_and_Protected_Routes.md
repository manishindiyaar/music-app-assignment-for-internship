# Study Guide 3 – Authentication & Protected Routes

> **Scenario**: The interviewer digs into login & role-based access.

---

❓ **How do users log in – do you have a backend?**

💡 For the sake of this assignment I went with a **very light-weight, front-only auth**. Credentials are not sent anywhere; instead I store the chosen role & email in `localStorage` so that the rest of the app can react to it.

The logic lives in a dedicated React **Context**:

```1:35:main-app/src/context/AuthContext.tsx
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const authStatus = localStorage.getItem('isAuthenticated');
    // …more code
  }, []);

  const login = (email: string, selectedRole: string) => {
    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    setIsAuthenticated(true);
    setRole(selectedRole);
    setEmail(email);
  };
```

Key take-aways:

* **`AuthContext`** exposes `isAuthenticated`, `role`, `email`, plus `login()` and `logout()`.
* The context checks `localStorage` on mount so a page refresh keeps the session alive.
* A derived boolean `isAdmin` lets the UI quickly check for admin capabilities.

---

❓ **How do you protect a route?**

💡 Instead of sprinkling `if` statements everywhere I created a tiny `<ProtectedRoute>` wrapper:

```1:20:main-app/src/components/ProtectedRoute.tsx
const { isAuthenticated } = useAuth();
if (!isAuthenticated) {
  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
}
return <>{children}</>;
```

I then use it like so:

```jsx
<Route path="/explore" element={
  <ProtectedRoute>
    <ExplorePage />
  </ProtectedRoute>
} />
```

If the user is not logged in they are **redirected** to `/login` and – thanks to `state={{ from }}` – automatically taken back after successful login.

---

❓ **How do you display different UIs for admin vs. normal user?**

💡 Components read the `role` from context. For example the glowing avatar in the sidebar shows a different style when `role === 'admin'`:

```58:70:main-app/src/components/Header.tsx
<div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
  role === 'admin' 
    ? 'iconBackground speaking-animation shadow-lg shadow-purple-500/30' 
    : isDarkMode
      ? 'bg-secondary/30 hover:bg-secondary/50'
      : 'bg-secondary/50 hover:bg-secondary/70'
}`}
```

---

That covers authentication flow, context management and route guarding. Up next: **global state for the currently playing song**. 