'use client'
import Image from "next/image";
import Chart1 from "@/components/chart1"

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="hidden lg:flex lg:w-1/2 lg:pl-4"> 
            <div className="rounded-lg border border-gray-300 bg-white bg-opacity-30 p-5 shadow-md dark:bg-gray-800 w-full">
                <Chart1 /> 
            </div>
          </div>
          <div className="w-full px-8 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  High Accuracy Predictions
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Our model boasts an impressive accuracy of 98%, ensuring reliable price predictions for real estate in major cities.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Secure Authentication
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We prioritize your data security with robust authentication protocols to safeguard user information.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Interactive Data Visualization
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Our platform includes dynamic charts and visualizations to help you understand real estate trends effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
