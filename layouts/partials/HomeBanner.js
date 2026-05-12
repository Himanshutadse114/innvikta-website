"use client";

import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import NetworkBackground from "@layouts/components/NetworkBackground";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect } from "react";
import { Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeBanner = ({ banner: bannerData, brands }) => {
  useEffect(() => {
    const ctx2 = gsap.context(() => {
      const banner = document.querySelector(".banner");
      const bannerBg = document.querySelector(".banner-bg");
      const bannerContent = document.querySelector(".banner-content");
      const header = document.querySelector(".header");
      const tl = gsap.timeline();

      tl.fromTo(
        ".banner-title",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5 }
      )
        .fromTo(
          ".banner-desc",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          ">-0.2"
        )
        .fromTo(
          ".banner-btn",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          ">-0.3"
        )
        .fromTo(
          ".banner-img",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          ">-.5"
        );

      //parallax banner
      const parallaxTl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: () => `top ${header.clientHeight}`,
          scrub: 1,
        },
      });

      const position = (banner.offsetHeight - bannerBg.offsetHeight) * 0.4;
      parallaxTl
        .fromTo(
          bannerBg,
          {
            y: 0,
          },
          {
            y: -position,
          }
        )
        .fromTo(
          bannerContent,
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        )
        .fromTo(
          ".banner-bg .circle",
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        );
    });

    return () => ctx2.revert();
  }, []);

  return (
    <section className="section banner pt-0">
      <div className="container-xl">
        <div className="relative overflow-hidden">
          <div className="bg-theme banner-bg col-12 absolute left-0 top-0 h-full overflow-hidden">
            <ImageFallback 
              src="/images/background-hero.png" 
              fill 
              priority 
              className="object-cover opacity-60" 
              alt="hero background"
            />
            <NetworkBackground />
            <Circle
              className="circle left-[10%] top-12"
              width={32}
              height={32}
              fill={false}
            />
            <Circle
              className="circle left-[2.5%] top-[29%]"
              width={85}
              height={85}
            />
            <Circle
              className="circle bottom-[48%] left-[22%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle bottom-[37%] left-[15%]"
              width={47}
              height={47}
              fill={false}
            />
            <Circle
              className="circle bottom-[13%] left-[6%]"
              width={62}
              height={62}
              fill={false}
            />
            <Circle
              className="circle right-[12%] top-[15%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle right-[2%] top-[30%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="circle right-[19%] top-[48%]"
              width={37}
              height={37}
              fill={false}
            />
            <Circle
              className="circle right-[33%] top-[54%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle bottom-[20%] right-[3%]"
              width={65}
              height={65}
            />
          </div>
          <div className="row overflow-hidden rounded-2xl">
            <div className="col-12">
              <div className="row relative justify-center pb-10">
                <div className="banner-content col-10 pb-0 pt-10 md:pt-20 text-center">
                  {markdownify(
                    bannerData.title,
                    "h1",
                    "mb-6 banner-title opacity-0 font-black text-slate-900 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  )}
                  {bannerData.description && (
                    <p className="banner-desc opacity-0 text-slate-600 text-base md:text-lg max-w-3xl mx-auto mb-8 font-medium leading-relaxed">
                      {bannerData.description}
                    </p>
                  )}
                  <div className="banner-btn opacity-0 flex flex-wrap items-center justify-center gap-4">
                    <Link
                      className="btn btn-primary shadow-lg shadow-orange-500/15"
                      href={bannerData.link.href}
                    >
                      {bannerData.link.label}
                    </Link>
                    {bannerData.link_secondary && (
                      <Link
                        className="btn btn-outline-primary h-12 flex items-center justify-center rounded-[6px] px-6 font-bold"
                        href={bannerData.link_secondary.href}
                      >
                        {bannerData.link_secondary.label}
                      </Link>
                    )}
                  </div>
                </div>
                <div className="col-12 md:col-10">
                  <ImageFallback
                    className="banner-img opacity-0 w-full h-auto"
                    src={bannerData.image}
                    width={1170}
                    height={666}
                    priority={true}
                    alt="Innvikta Dashboard"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row border-y border-border py-10">
            <div className="col-12 text-center mb-8">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Trusted By Companies</span>
            </div>
            <div className="animate from-right col-12">
              <Swiper
                loop={true}
                slidesPerView={4}
                breakpoints={{
                  992: {
                    slidesPerView: 7,
                  },
                }}
                spaceBetween={5}
                modules={[Autoplay, FreeMode]}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                speed={4000}
                grabCursor={false}
                allowTouchMove={false}
                freeMode={true}
                className="ticker-swiper"
              >
                {brands.map((brand, index) => (
                  <SwiperSlide
                    className="h-24 cursor-pointer px-2 py-2 grayscale transition hover:grayscale-0 lg:px-4"
                    key={"brand-" + index}
                  >
                    <div className="relative h-full w-full flex items-center justify-center bg-white/50 rounded-lg border border-slate-100/50">
                      <ImageFallback
                        className="object-contain p-2"
                        src={brand}
                        sizes="200px"
                        alt=""
                        fill={true}
                        priority={true}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
