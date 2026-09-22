import { ImageResponse } from "next/og";
import { IconMark } from "@/lib/icon-mark";

// 32x32: retina tab strips (16 CSS px at 2x), bookmark bars, history entries.
// See icon.tsx for why the sizes are split across two numbered files.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<IconMark size={size.width} />, { ...size });
}
