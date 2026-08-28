"use client";

import React, { useState } from "react";
import { LoginGate } from "@/components/LoginGate";

export default function LoginPage() {
  const [authError, setAuthError] = useState("");

  return (
    <main>
      <LoginGate
        authError={authError}
        setAuthError={setAuthError}
        onAuthSuccess={(user) => {
          console.log("Logged in user:", user);
        }}
      />
    </main>
  );
}
