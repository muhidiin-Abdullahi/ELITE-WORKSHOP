const fieldBase =
  "block w-full border border-border-strong/70 bg-surface-raised px-4 text-base text-[#1d1d33] transition-colors duration-150 placeholder:text-muted hover:border-ink focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ink disabled:opacity-60 aria-invalid:border-error aria-invalid:bg-error-subtle motion-reduce:transition-none";

/* Single-line inputs and selects. The chevron only draws on select elements. */
export const inputClassName = `${fieldBase} h-[3.25rem] [&:is(select)]:cursor-pointer [&:is(select)]:appearance-none [&:is(select)]:bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%208'%3E%3Cpath%20d='M1%201.5l5%205%205-5'%20fill='none'%20stroke='%2316163a'%20stroke-width='1.5'/%3E%3C/svg%3E")] [&:is(select)]:bg-[length:0.75rem] [&:is(select)]:bg-[right_1.125rem_center] [&:is(select)]:bg-no-repeat [&:is(select)]:pr-11`;

export const textareaClassName = `${fieldBase} min-h-[9.5rem] resize-y py-3.5`;
