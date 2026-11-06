/** Chaque page arrive en fondu. L'animation ne laisse aucune transformation : les éléments fixes restent fixes. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
