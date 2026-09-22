/** Joins conditional class names. The repo has no `clsx`, and the chat widget
 *  is the only thing here that needs one. */
export function cx(
  ...parts: (string | false | null | undefined)[]
): string {
  return parts.filter(Boolean).join(" ");
}
