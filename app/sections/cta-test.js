import Image from "next/image";

export default function CTATest() {
  return (
    <section className="relative">
      <Image
        src="/home-engage-us-section.jpg"
        alt="slide"
        width={1000}
        height={100}
        className="absolute w-full h-full -z-10 top-0 left-0 object-cover"
      />
      <div className="backdrop-blur-sm">
        <div className="max-w-screen-lg mx-auto px-10 py-14 backdrop-blur-md">
          <div className="max-w-lg p-6 bg-app text-white space-y-4">
            <h1 className="text-4xl font-extrabold mb-12 tracking-wide">
              Is there a business challenge that is bothering you?
            </h1>
            <p className="text-gray-200 max-w-sm text-lg">
              Write to us and we will get back to you with a response soon.
            </p>
            <button className="bg-black px-6 py-2 text-lg text-white tracking-wider rounded-full">
              Engage Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
