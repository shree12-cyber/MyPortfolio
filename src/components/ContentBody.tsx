import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import VisitButton from '../components/VisitButton'

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
    <Bounded as={"article" as "section"}>
      <div className="rounded-2xl border-2 border-stone-700 bg-stone-950 px-4 py-10 md:px-10 md:py-20">
        <Heading as="h1">{page.data.title}</Heading>
        <div className="flex gap-4 text-xl font-bold text-pink-400">
          {page.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p className="mt-8 border-b border-stone-600 text-xl font-medium text-stone-300">
          {formattedDate}
        </p>
        <div className="md:mt-17 prose prose-lg prose-invert mt-10 w-full max-w-none [&>*]:max-w-full">
          {Array.isArray(page.data.description) ? (
            <ul className="list-disc pl-6">
              {page.data.description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          ) : (
            <p>{page.data.description}</p>
          )}

          {Array.isArray(page.data.about) ? (
            <>
              <h3>About Project</h3>
              <ul className="list-disc pl-6">
                {page.data.about.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>{page.data.about || "No content available."}</p>
          )}

          {page.data.img && (
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.values(page.data.img).map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Project screenshot ${index + 1}`}
                  className="h-auto w-full rounded-lg shadow-md"
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
      </div>
    </Bounded>
  );
}
