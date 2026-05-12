import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Link from "next/link";
import Image from "next/image";

const SpecialFeatures = ({ speciality }) => {
  return (
    <section className="section overflow-hidden">
      <div className="container">
        {/* Main Section Heading - H1, Branded Orange */}
        <div className="row justify-center text-center mb-10">
          <div className="col-12">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight text-dark">
              <span className="text-primary">Innvikta</span> Security Awareness Training Platform
            </h1>
          </div>
        </div>

        {speciality.list?.map((item, index) => (
          <div
            key={index}
            className={`row relative items-center justify-between ${index !== 0 ? "mt-16" : "mt-10"
              }`}
          >
            {/* Decorative Waves for each row */}
            <div className={`absolute top-1/4 left-0 w-full -translate-y-1/2 -z-10 opacity-70 pointer-events-none ${index % 2 !== 0 ? 'rotate-180' : ''}`}>
               <Image 
                src="/images/wave.svg" 
                alt="wave decoration" 
                width={1381} 
                height={283} 
                className="w-full scale-150"
               />
            </div>
            <div className={`absolute top-3/4 left-0 w-full -translate-y-1/2 -z-10 opacity-80 pointer-events-none ${index % 2 === 0 ? 'rotate-180' : ''}`}>
               <Image 
                src="/images/wave.svg" 
                alt="wave decoration" 
                width={1381} 
                height={283} 
                className="w-full scale-125"
               />
            </div>

            {/* Floating Shields */}
            <div className="absolute top-10 left-[10%] opacity-10 -z-10 animate-bounce duration-[3s]">
              <FeatherIcon icon="shield" size={120} className="text-primary" />
            </div>
            <div className="absolute bottom-10 right-[15%] opacity-10 -z-10 animate-bounce duration-[4s]">
              <FeatherIcon icon="shield" size={80} className="text-primary" />
            </div>
            <div className="absolute top-1/2 right-[5%] opacity-5 -z-10 rotate-12">
              <FeatherIcon icon="shield" size={160} className="text-primary" />
            </div>

            <div
              className={`animate md:col-5 ${index % 2 !== 0 ? "order-1 md:order-2 pr-6 md:pr-12 lg:pr-24" : "pl-6 md:pl-12 lg:pl-24"
                }`}
            >
              {/* Main Heading */}
              {markdownify(
                item.subtitle,
                "h2",
                "font-bold leading-tight text-primary uppercase text-2xl md:text-3xl mb-4"
              )}

              {/* Sub Heading / Metric - Further Reduced Size */}
              {markdownify(
                item.title,
                "p",
                "text-lg md:text-xl font-bold text-slate-500 leading-tight"
              )}

              {/* Description - Darker for visibility */}
              {markdownify(item.description, "p", "mt-6 text-slate-700 text-lg leading-relaxed")}

              {item.button && (
                <div className="mt-8">
                  <Link href={item.button.link} className="btn btn-primary">
                    {item.button.label}
                  </Link>
                </div>
              )}
            </div>
            <div
              className={`animate ${index % 2 === 0 ? "from-right" : "from-left order-2 md:order-1 pl-6 md:pl-12 lg:pl-24"
                } md:col-6 mt-10 md:mt-0 ${index % 2 === 0 ? "pr-6 md:pr-12 lg:pr-24" : ""
                }`}
            >
              <ImageFallback
                src={item.image}
                width={585}
                height={447}
                alt={item.title}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialFeatures;
