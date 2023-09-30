import { db } from "@/common/firebase";
import { ECollectionFirebase } from "@/enum/ECollectionFirebase";
import { IConfig } from "@/models/config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

export class ConfigRepository {
  async gets(): Promise<IConfig[]> {
    const configs: IConfig[] = [];
    const querySnapshot = await getDocs(
      collection(db, ECollectionFirebase.CONFIG)
    );
    querySnapshot.forEach((doc) => {
      configs.push({ ...doc.data(), id: doc.id } as IConfig);
    });
    return configs;
  }

  async createAsync(payload: IConfig): Promise<string> {
    try {
      const docRef = await addDoc(
        collection(db, ECollectionFirebase.CONFIG),
        payload
      );
      return docRef.id;
    } catch (ex) {
      console.error(ex);
      return "";
    }
  }

  async deleteMultipleAsync(ids: string[]): Promise<boolean> {
    try {
      const batch = writeBatch(db);
      ids.forEach((docId) => {
        batch.delete(doc(db, ECollectionFirebase.CONFIG, docId));
      });
      await batch.commit();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateAsync(payload: IConfig): Promise<boolean> {
    try {
      const docRef = await updateDoc(
        doc(db, ECollectionFirebase.CONFIG, payload.id + ""),
        { ...payload }
      );
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    }
  }
}
