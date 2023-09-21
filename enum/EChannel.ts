export enum EChannel {
  SHOPEE = "SHOPEE",
  TIKTOK = "TIKTOK",
}

export namespace EChannel {
  export function toString(channel: EChannel): string {
    switch (channel) {
      case EChannel.SHOPEE:
        return "Shopee";
      case EChannel.TIKTOK:
        return "Tiktok";
      default:
        return "";
    }
  }
}

export function EChannelToString(channel: EChannel): string {
  switch (channel) {
    case EChannel.SHOPEE:
      return "Shopee";
    case EChannel.TIKTOK:
      return "Tiktok";
    default:
      return "";
  }
}
