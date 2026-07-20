type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, copy, align = "left" }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-tide">{eyebrow}</p> : null}
      <h2 className="font-serif text-3xl leading-tight text-leaf md:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-8 text-charcoal-olive/75 md:text-lg">{copy}</p> : null}
    </div>
  );
}
