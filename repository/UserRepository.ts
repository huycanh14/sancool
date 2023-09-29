import { auth } from "@/common/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
export class UserRepository {
  async signInWithEmailAndPassAsync(payload: {
    email: string;
    password: string;
  }): Promise<string> {
    return await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return user.uid;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
        return "";
      });
  }
}
