import Link from 'next/link';

export default function Logo() {
  return (
    <div className="flex flex-row gap-1" aria-label="EstateIQ">
      <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Gradient for light mode */}
          <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="real-estate-logo-light">
            <stop stopColor="#1D3557" offset="0%" />         {/* Deep Blue */}
            <stop stopColor="#457B9D" offset="50%" />        {/* Soft Sky Blue */}
            <stop stopColor="#A8DADC" offset="100%" />       {/* Light Teal */}
          </linearGradient>
          {/* Gradient for dark mode */}
          <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="real-estate-logo-dark">
            <stop stopColor="#A8DADC" offset="0%" />         {/* Light Teal */}
            <stop stopColor="#457B9D" offset="50%" />        {/* Soft Sky Blue */}
            <stop stopColor="#1D3557" offset="100%" />       {/* Deep Blue */}
          </linearGradient>
        </defs>

        {/* House shape with light and dark mode conditional gradients */}
        <path
          d="M4 20 L16 4 L28 20 Z" 
          fill="url(#real-estate-logo-light)" 
          className="dark:hidden"
        />
        <path
          d="M4 20 L16 4 L28 20 Z" 
          fill="url(#real-estate-logo-dark)" 
          className="hidden dark:block"
        />
        
        {/* House Base and door */}
        <rect x="8" y="20" width="16" height="10" fill="#1D3557" className="dark:fill-[#A8DADC]" />
        <rect x="12" y="24" width="4" height="6" fill="#A8DADC" className="dark:fill-[#1D3557]" />
        <rect x="20" y="22" width="3" height="3" fill="#A8DADC" className="dark:fill-[#1D3557]" />
      </svg>

      {/* Gradient text for both light and dark modes */}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-teal-400 dark:from-teal-400 dark:to-blue-800 font-bold text-2xl">
        EstateIQ
      </span>
    </div>
  );
}
