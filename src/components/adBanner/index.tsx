"use client";

import { useEffect } from "react";

type AdBannerProps = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: string;
};

export function AdBanner({
  dataAdFormat,
  dataAdSlot,
  dataFullWidthResponsive = "true",
}: AdBannerProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
        height: 80,
        marginTop: 16,
      }}
      data-ad-client="ca-pub-8976093869692251"
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive}
    ></ins>
  );
}
