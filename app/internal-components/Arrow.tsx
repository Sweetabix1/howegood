export const Arrow = (props: { angle: number }) => {
  return (
    <div className="bg-white/10 w-7 h-7 rounded-full flex items-center justify-center">
      <div style={{ transform: `rotate(${props.angle}deg)` }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" viewBox="0 0 256 256">
          <path d="M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z"></path>
        </svg>
      </div>
    </div>
  );
};
