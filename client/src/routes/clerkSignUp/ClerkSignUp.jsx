import { SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "../../context/ThemeContext";
import "./clerkSignUp.scss";

export default function ClerkSignUp() {
  const { theme } = useTheme();

  return (
    <div className="signup-container">
      <SignUp
        path="/clerk-signup"
        signInFallbackRedirectUrl="/"
        forceRedirectUrl="/"
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
      />
    </div>
  );
}
