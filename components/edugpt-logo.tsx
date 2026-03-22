/**
 * EduGPT Logo — graduation cap beeldmerk + "EduGPT" tekst
 * Supports light/dark mode via Tailwind classes.
 * Matches branding from edugpt.nl
 */

import { cn } from '@/lib/utils';

interface EduGPTLogoProps {
  className?: string;
  iconSize?: string;
  textSize?: string;
  showText?: boolean;
}

export function EduGPTLogo({
  className,
  iconSize = 'w-7 h-7 sm:w-6 sm:h-6',
  textSize = 'text-2xl sm:text-xl',
  showText = true,
}: EduGPTLogoProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('flex-shrink-0', iconSize)}
      >
        <path
          d="M8 11L14 8V14H16V5L8 1L0 5V7L8 11Z"
          className="fill-[#4c1d95] dark:fill-gray-100"
        />
        <path
          d="M2 10.2361V13L8 16L12 14V11.2361L8 13.2361L2 10.2361Z"
          className="fill-[#4c1d95] dark:fill-gray-100"
        />
      </svg>
      {showText && (
        <span className={cn('font-bold tracking-tight leading-none', textSize)}>
          <span className="text-[#5b21b6] dark:text-gray-100">Edu</span>
          <span className="text-[#4c1d95] dark:text-gray-300">GPT</span>
        </span>
      )}
    </div>
  );
}
