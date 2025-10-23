import { SignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "../../context/ThemeContext";
import "./clerkSignIn.scss";

export default function ClerkSignIn() {
  const { theme } = useTheme();

  return (
    <div className="signin-container">
      <SignIn
        path="/clerk-signin"
        routing="path"
        signUpUrl="/clerk-signup"
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
          //   elements: {
          //     card: "bg-foreground",
          //     formButtonPrimary: "bg-primary rounded-md",
          //     footerActionLink: "text-primary",
          //     formFieldInput__identifier: "rounded-md bg-background border-muted",
          //   },
        }}
      />
    </div>
  );
}
