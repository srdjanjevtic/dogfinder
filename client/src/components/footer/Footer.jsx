import "./footer.scss";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Footer = () => {
  const { user } = useUser();
  console.log(user?.id || "neulogovan");
  // for (const account of user.externalAccounts) {
  //   console.log("account: ", account.provider);
  // }
  return (
    <footer className="footer">
      <div className="clerk">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton userProfileModel="modal" />
        </SignedIn>
      </div>
      <p>&#169; 2010-{new Date().getFullYear()} FARMERI I PORTIRI</p>
    </footer>
  );
};

export default Footer;
