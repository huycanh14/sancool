import { db } from "@/common/firebase";
import { ECollectionFirebase } from "@/enum/ECollectionFirebase";
import { IUserSpin } from "@/models/user-spin";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

export class UserSpinRepository {
  async create(payload: IUserSpin): Promise<string> {
    const docRef = await addDoc(
      collection(db, ECollectionFirebase.USER_SPIN),
      payload
    );
    return docRef.id;
  }

  async findCountSpin(payload: IUserSpin): Promise<number> {
    let cnt = 0;
    const queryConstraints = [];
    queryConstraints.push(where("phone", "==", payload.phone));
    queryConstraints.push(where("channel", "==", payload.channel));
    queryConstraints.push(where("expiredAt", "==", payload.expiredAt));
    const querySnapshot = await getDocs(
      query(collection(db, ECollectionFirebase.USER_SPIN), ...queryConstraints)
    );
    cnt = querySnapshot.size;
    return cnt;
  }

  async getsAsync(): Promise<IUserSpin[]> {
    const userSpins: IUserSpin[] = [];
    const querySnapshot = await getDocs(
      collection(db, ECollectionFirebase.USER_SPIN)
    );
    querySnapshot.forEach((doc) => {
      userSpins.push({ ...doc.data(), id: doc.id });
    });
    return userSpins;
  }

  async deleteMultipleAsync(ids: string[]): Promise<boolean> {
    try {
      const batch = writeBatch(db);
      ids.forEach((docId) => {
        batch.delete(doc(db, ECollectionFirebase.USER_SPIN, docId));
      });
      await batch.commit();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
