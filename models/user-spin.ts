import { EChannel } from "@/enum/EChannel";

export interface IUserSpin {
  id?: string;
  phone?: string;
  channel?: EChannel;
  voucher?: string;
}
