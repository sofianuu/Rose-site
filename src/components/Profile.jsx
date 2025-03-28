import { useState } from 'react';

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    if (username && password) {
      setUser({ name: username, email: `${username}@example.com` });
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Conectează-te</h2>
        <input
          type="text"
          placeholder="Nume utilizator"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-4 py-2 mb-2"
        />
        <input
          type="password"
          placeholder="Parolă"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 mb-4"
        />
        <button onClick={handleLogin} className="bg-black text-white px-6 py-2">Autentificare</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-2">Profilul meu</h2>
      <p className="text-lg">Nume: {user.name}</p>
      <p className="text-lg">Email: {user.email}</p>
      <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 mt-4">Deconectare</button>
    </div>
  );
};

export default Profile;
