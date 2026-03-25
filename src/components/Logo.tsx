export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Lightning bolt icon */}
      <path
        d="M22 4L10 22H19L14 36L30 16H21L22 4Z"
        fill="white"
      />
      {/* БЫСТРО text */}
      <text
        x="38"
        y="27"
        fontFamily="monospace"
        fontSize="16"
        fontWeight="600"
        fill="white"
        letterSpacing="1"
      >
        БЫСТРОЗАЙМ
      </text>
    </svg>
  );
};
