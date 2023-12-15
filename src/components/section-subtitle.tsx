export function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-2xl text-md sm:text-lg text-center leading-relaxed">
      {children}
    </h2>
  );
}
