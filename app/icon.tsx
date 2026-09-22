import { ImageResponse } from "next/og";
import { IconMark } from "@/lib/icon-mark";

// Natively rendered at 16x16 so non-retina tab strips get an exact-size asset
// rather than a downscale of the 32x32 one.
//
// Next emits one <link rel="icon"> per icon file, sorted lexically, so this
// file's tag comes before icon1.tsx's. Size-aware browsers pick by `sizes`;
// the larger asset is declared last so that browsers which simply take the
// last tag end up on 32x32, which still downscales cleanly.
export const size = { width: 16, height: 16 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<IconMark size={size.width} />, { ...size });
}
