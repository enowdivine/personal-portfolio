import { ImageResponse } from "next/og";
import { IconMark } from "@/lib/icon-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  // Same mark, more air: iOS masks the icon into a squircle and shows it
  // large, where a favicon-tight letter reads as cramped.
  return new ImageResponse(<IconMark size={size.width} glyph={0.68} />, {
    ...size,
  });
}
