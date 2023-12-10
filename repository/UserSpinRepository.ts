import { db } from "@/common/firebase";
import { ECollectionFirebase } from "@/enum/ECollectionFirebase";
import { IUserSpin } from "@/models/user-spin";
import dayjs from "dayjs";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import _ from "lodash";

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
    const queryConstraints = [];
    queryConstraints.push(orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(
      query(collection(db, ECollectionFirebase.USER_SPIN), ...queryConstraints)
    );
    querySnapshot.forEach((doc) => {
      const data: IUserSpin = {
        ...doc.data(),
        id: doc.id,
      };
      data.createdAt = dayjs(
        (data.createdAt! + "").split(" ").slice(1).join(" ")
      ).toDate();
      userSpins.push(data);
    });
    const data = _.sortBy(userSpins, function (dateObj) {
      return new Date(dateObj.createdAt!);
    });
    return data;
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
