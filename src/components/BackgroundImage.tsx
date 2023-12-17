import clsx from 'clsx'

export function BackgroundImage({
  className,
  position = 'full',
}: {
  className?: string
  position?: 'hidden' | "full"
}) {
  return (
    <div
      className={clsx(
        'absolute inset-0 overflow-hidden bg-gray-200',
        className,
      )}
    >
      <img
        className={clsx(
          'absolute top-0',
          position === 'hidden' &&
            'hidden',
          position === 'full' &&
            'xl:w-full xl:h-auto opacity-30 object-cover h-full w-auto',
        )}
        src={"/images/6ee144801b1e5221410445f7e824b669.png"}
        alt=""
        width={918}
        height={1495}
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
    </div>
  )
}
