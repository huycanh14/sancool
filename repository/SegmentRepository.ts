import { db } from "@/common/firebase";
import { ECollectionFirebase } from "@/enum/ECollectionFirebase";
import { ISegment } from "@/models/segment";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

export class SegmentRepository {
  async getSegmentsAsync(): Promise<ISegment[]> {
    try {
      const segments: ISegment[] = [];
      const querySnapshot = await getDocs(
        collection(db, ECollectionFirebase.SEGMENT)
      );
      querySnapshot.forEach((doc) => {
        segments.push({ ...doc.data(), id: doc.id });
      });
      return segments;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }

  async createAsync(payload: ISegment): Promise<string> {
    try {
      const docRef = await addDoc(
        collection(db, ECollectionFirebase.SEGMENT),
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
        batch.delete(doc(db, ECollectionFirebase.SEGMENT, docId));
      });
      await batch.commit();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateAsync(payload: ISegment): Promise<boolean> {
    try {
      const docRef = await updateDoc(
        doc(db, ECollectionFirebase.SEGMENT, payload.id + ""),
        { ...payload }
      );
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    }
  }
}
