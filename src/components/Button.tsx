import clsx from 'clsx'

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & { 
  href?: string
  blank?: boolean
}


export function Button({ className, blank, ...props }: ButtonProps) {
  className = clsx(
    'inline-flex justify-center rounded-2xl bg-black p-4 text-base font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70',
    className,
  )

  const aProps = { ...props }
  if (blank) {
    aProps.target = "_blank";
    aProps.rel = "noopener noreferrer"
  }

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <a className={className} {...aProps} />
  )
}
