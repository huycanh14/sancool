import { db } from "@/common/firebase";
import { ECollectionFirebase } from "@/enum/ECollectionFirebase";
import { IConfig } from "@/models/config";
import { collection, getDocs } from "firebase/firestore";

export class ConfigRepository {
  async gets(): Promise<IConfig[]> {
    const configs: IConfig[] = [];
    const querySnapshot = await getDocs(
      collection(db, ECollectionFirebase.CONFIG)
    );
    querySnapshot.forEach((doc) => {
      configs.push({ ...doc.data(), id: doc.id });
    });
    return configs;
  }
}
