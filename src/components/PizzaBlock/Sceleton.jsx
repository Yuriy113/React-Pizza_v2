import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={460}
    viewBox="0 0 300 460"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="126" cy="125" r="120" />
    <rect x="2" y="268" rx="10" ry="10" width="248" height="31" />
    <rect x="7" y="318" rx="10" ry="10" width="236" height="60" />
    <rect x="5" y="399" rx="10" ry="10" width="95" height="34" />
    <rect x="120" y="399" rx="20" ry="20" width="124" height="46" />
  </ContentLoader>
);

export default Sceleton;
