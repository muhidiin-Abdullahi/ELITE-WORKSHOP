type TitleBlockProps = {
  heading: string;
  /** Short reference shown at the right of the header strip. */
  reference?: string;
  rows: Array<{ label: string; value: string }>;
  className?: string;
};

/** Key facts set out like the title block on a workshop drawing. */
export function TitleBlock({
  heading,
  reference,
  rows,
  className = "",
}: TitleBlockProps) {
  return (
    <div className={`title-block ${className}`.trim()}>
      <div className="title-block-head text-overline">
        <span>{heading}</span>
        {reference ? <span className="shrink-0 opacity-70">{reference}</span> : null}
      </div>
      <dl>
        {rows.map((row) => (
          <div key={row.label} className="title-block-row">
            <dt className="shrink-0 text-overline text-[#5a5968]">{row.label}</dt>
            <dd className="text-right text-sm font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
