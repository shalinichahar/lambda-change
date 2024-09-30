import React from 'react';

const Gauge = ({ value }) => {
  const getStatus = (value) => {
    if (value <= 200) return 'Poor';
    if (value <= 400) return 'Fair';
    if (value <= 600) return 'Good';
    if (value <= 800) return 'Very Good';
    return 'Excellent';
  };
  const getColor = (value) => {
    if (value <= 200) return '#E53935';
    if (value <= 400) return '#FB8C00';
    if (value <= 600) return '#FDD835';
    if (value <= 800) return '#8BC34A';
    return '#4CAF50';
  };
  const angle = (value / 1000) * 180 - 90; // Calculate the angle for the pointer
  const status = getStatus(value);
  const color = getColor(value);

  const cx = 150;
  const cy = 150;
  const r = 135;
  const innerRadius = 85; // Reduced inner circle radius for more space inside

  const getPath = (startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', cx, cy,
      'L', start.x, start.y,
      'A', r, r, 0, largeArcFlag, 0, end.x, end.y,
      'L', cx, cy,
    ].join(' ');
  };

  const polarToCartesian = (cx, cy, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: cx + (radius * Math.cos(angleInRadians)),
      y: cy + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="gauge-container">
      <svg width="350" height="130" viewBox="0 0 300 150">

      <defs>
          <linearGradient id="pointer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#B2BEB5', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#E5E4E2', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Background segments */}
        <path d={getPath(-90, -54)} fill="#E53935" stroke="#eeeeee" strokeWidth="7" />
        <path d={getPath(-54, -18)} fill="#FB8C00" stroke="#eeeeee" strokeWidth="7" />
        <path d={getPath(-18, 18)} fill="#FDD835" stroke="#eeeeee" strokeWidth="7" />
        <path d={getPath(18, 54)} fill="#1fd655" stroke="#eeeeee" strokeWidth="7" />
        <path d={getPath(54, 90)} fill="#00ab41" stroke="#eeeeee" strokeWidth="7" />      

        {/* Inner circle */}
        <circle cx="150" cy="150" r={innerRadius} fill="#fff" stroke="#eeeeee" strokeWidth="7" />

        {/* Pointer */}
        <polygon
          points="145,74 154,96 135,96"
          fill="url(#pointer-gradient)"
          transform={`rotate(${angle}, 150, 150)`}
        />

        {/* Text */}
        <text x="150" y="130" textAnchor="middle" fontSize="18" fill="#000" fontWeight="bold">
          {value}
        </text>
        <text x="150" y="150" textAnchor="middle" fontSize="16" fill={color} fontWeight="bold">
        {status.toUpperCase()}
        </text>
      </svg>
    </div>
  );
};

export default Gauge;
