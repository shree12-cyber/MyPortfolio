import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import VisitButton from "../components/VisitButton";

type PageType = {
  uid: string;
  date: string;
  tags: string[];
  data: {
    title: string;
    description: string | string[];
    about?: string[] | string;
    img?: Record<string, string>;
    cta_label?: string;
  };
  link?: string;
};

export default async function ContentBody({ page }: { page: PageType }) {
  function formatDate(date: string) {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", dateOptions).format(parsedDate);
    }
  }

  const formattedDate = formatDate(page.date);

  return (
    <Bounded as="section">
      <article className="rounded-2xl border border-stone-700 bg-stone-950 px-4 py-10 sm:px-6 md:px-10 sm:py-12 md:py-20">
        <Heading as="h1" className="text-2xl sm:text-3xl md:text-4xl">
          {page.data.title}
        </Heading>

        <div className="mt-4 flex flex-wrap gap-2 text-sm sm:text-base font-bold text-pink-400">
          {page.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <p className="mt-6 border-b border-stone-600 pb-2 text-base sm:text-lg font-medium text-stone-300">
          {formattedDate}
        </p>

        <div className="prose prose-invert prose-lg mt-10 w-full max-w-none [&>*]:max-w-full">
          {Array.isArray(page.data.description) ? (
            <ul className="list-disc pl-6">
              {page.data.description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          ) : (
            <p>{page.data.description}</p>
          )}

          {page.data.about && (
            <>
              <h3 className="mt-8 text-xl sm:text-2xl font-semibold">
                About Project
              </h3>
              {Array.isArray(page.data.about) ? (
                <ul className="list-disc pl-6">
                  {page.data.about.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p>{page.data.about}</p>
              )}
            </>
          )}

          {page.data.img && (
            <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.values(page.data.img).map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Project screenshot ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-md object-cover"
                />
              ))}
            </div>
          )}

          {page.link && (
            <div className="mt-8">
              <VisitButton
                linkField={{ url: page.link, link_type: "Web" }}
                label="Visit Project"
                showIcon={true}
              />
            </div>
          )}
        </div>
      </article>
    </Bounded>
  );
}
