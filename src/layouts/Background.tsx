import { HTMLAttributes } from 'react';

export interface BubbleProps {
  size: number;
}

export function Bubble({
  size,
  className,
}: BubbleProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`absolute rounded-[100%] ${className || ''}`}
      style={{
        position: 'absolute',
        width: `${size}vw`,
        height: `${size}vw`,
        borderRadius: '100%',

        background: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(8px)',
      }}
    ></div>
  );
}

export function Background({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div
        className='absolute top-0 left-0 z-0 w-full h-full rounded-[2rem] flex items-center justify-center'
        style={{
          background: `linear-gradient(113.56deg, #86198F 18.8%, #312E81 72.94%)`,
        }}
      ></div>
      <div className='absolute w-[97vw] rounded-[2rem] h-[95vh] m-4 border-indigo-600 border-[1rem] bg-indigo-900/25 z-0'></div>

      <Bubble size={30} className='left-[60%] top-[20%]' />
      <Bubble size={20} className='left-[22%] top-[35%]' />
      <Bubble size={23} className='left-[8%] top-[5%]' />

      {children}
    </>
  );
}
