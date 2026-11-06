/** Chaque changement de page arrive en douceur. L'animation ne laisse aucune transformation : les éléments fixes restent fixes. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="cap-page">{children}</div>;
}
