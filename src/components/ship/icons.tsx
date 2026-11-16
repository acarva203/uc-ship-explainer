import type { SVGProps } from "react";
export type IconName = "medical" | "mental" | "rx" | "dental" | "vision" | "urgent" | "er" | "virtual" | "shield";
const paths: Record<IconName, JSX.Element> = {
  medical: (<><path d="M9 4v5a4 4 0 0 0 8 0V4" /><path d="M13 13v3a4 4 0 0 0 8 0v-1" /><circle cx="21" cy="13" r="2" /><path d="M7.5 4h3M15.5 4h3" /></>),
  mental: (<><path d="M12 24c-4 0-7-3-7-7.5C5 11 9 6 14.5 6S24 10 24 15c0 2-1 3.5-2 4.5V24" /><path d="M11 14.5c1-1.5 3-1.5 3.5 0 .5-1.5 2.5-1.5 3.5 0 .6 1-.2 2.5-3.5 4.5-3.3-2-4.1-3.5-3.5-4.5Z" /></>),
  rx: (<><rect x="6" y="11" width="16" height="8" rx="4" transform="rotate(-40 14 15)" /><path d="m11 10.5 6 7.5" /></>),
  dental: (<path d="M9 5c-3 0-4.5 3-4 6 .5 3 1.5 4 2 8 .4 3 1.2 5 2.5 5s1.7-3 2-5 1.2-3 2.5-3 2.2 1 2.5 3 .7 5 2 5 2.1-2 2.5-5c.5-4 1.5-5 2-8 .5-3-1-6-4-6-2 0-3 1-5 1S11 5 9 5Z" />),
  vision: (<><path d="M3 14s4-7 11-7 11 7 11 7-4 7-11 7S3 14 3 14Z" /><circle cx="14" cy="14" r="3.5" /></>),
  urgent: (<><circle cx="14" cy="14" r="10" /><path d="M14 8v6l4 2.5" /></>),
  er: (<><rect x="4" y="9" width="20" height="13" rx="2" /><path d="M14 12.5v6M11 15.5h6M10 9V6h8v3" /></>),
  virtual: (<><rect x="5" y="4" width="18" height="20" rx="3" /><circle cx="14" cy="12" r="3" /><path d="M9.5 19.5c1-2 2.6-3 4.5-3s3.5 1 4.5 3" /></>),
  shield: (<><path d="M14 3 5 6.5v6.5c0 5.5 3.8 9.8 9 12 5.2-2.2 9-6.5 9-12V6.5L14 3Z" /><path d="M14 9v8M10 13h8" /></>),
};
export function Icon({ name, className = "size-7", ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...rest}>
      {paths[name]}
    </svg>
  );
}
