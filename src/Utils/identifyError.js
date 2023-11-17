export const handleFirebaseError = (error) => {
  switch (error.code) {
    case "auth/email-already-exists":
      return "email already exists";
    case "auth/id-token-expired":
      return "token expired, login again";
    case "auth/id-token-revoked":
      return "token revoked, login again";
    case "auth/invalid-credential":
      return "Invalid Credentials";
    case "auth/invalid-display-name":
      return "Invalid display name";
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/invalid-id-token":
      return "Invalid Token";
    case "auth/invalid-uid":
      return "Invalid uid";
    case "auth/missing-uid":
      return "Missing uid";
    case "auth/uid-already-exists":
      return "uid already exists";
    case "auth/user-not-found":
      return "User not found";
    default:
      return String(error.code).split("/")[1].split("-").join(" ");
  }
};
