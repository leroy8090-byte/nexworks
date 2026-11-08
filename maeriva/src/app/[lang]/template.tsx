/** Entre deux pages, un simple fondu : rapide, discret, sans rien masquer. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
