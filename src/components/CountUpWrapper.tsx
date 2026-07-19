"use client";

import CountUp from 'react-countup';

export default function CountUpWrapper(props: any) {
  // enableScrollSpy ensures the animation triggers when the element scrolls into view
  return <CountUp enableScrollSpy scrollSpyOnce {...props} />;
}
