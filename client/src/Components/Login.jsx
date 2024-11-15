import React from "react";

function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google"; // Redirect to the backend Google login route
  };

  return (
      <button
        onClick={handleGoogleLogin}
        className="bg-cyan-600 p-2 rounded-xl m-4"
      >
        Login with Google
      </button>
  );
}

export default LoginPage;
