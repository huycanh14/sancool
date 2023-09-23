import { db } from "@/common/firebase";
import { ECollectionFirebase } from "@/enum/ECollectionFirebase";
import { ISegment } from "@/models/segment";
import { collection, getDocs } from "firebase/firestore";

export class SegmentRepository {
  async getSegmentsAsync(): Promise<ISegment[]> {
    console.log(11111);
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
      console.log(ex);
      throw ex;
    }
  }
}
