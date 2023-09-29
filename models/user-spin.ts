import { EChannel } from "@/enum/EChannel";

export interface IUserSpin {
  id?: string | "0";
  phone?: string;
  channel?: EChannel;
  voucher?: string;
  expiredAt?: Date | string;
  createdAt?: Date | string;
  segment?: string;
}
