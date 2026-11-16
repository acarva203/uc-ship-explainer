import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { Text, translate, useLanguage } from "@/lib/guide-language";
export function translatedTree(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") return <Text>{child}</Text>;
    if (!isValidElement<{ children?: ReactNode; "aria-label"?: string; title?: string }>(child) || child.type === Text || child.type === Translated) return child;
    if (typeof child.type === "function" || (typeof child.type === "object" && child.type !== null)) return child;
    return <TranslatedElement element={child} />;
  });
}
function TranslatedElement({ element }: { element: ReactElement<{ children?: ReactNode; "aria-label"?: string; title?: string }> }) {
  const { language } = useLanguage();
  const props: { "aria-label"?: string; title?: string } = {};
  if (element.props["aria-label"]) props["aria-label"] = translate(element.props["aria-label"], language);
  if (element.props.title) props.title = translate(element.props.title, language);
  return cloneElement(element, props, translatedTree(element.props.children));
}
export function Translated({ children }: { children: ReactNode }) { return <>{translatedTree(children)}</>; }