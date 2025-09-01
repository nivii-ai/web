import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, SearchX } from "lucide-react";
import { getMessages, getTranslations } from "next-intl/server";

export default async function PositionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("careers");
  const messages = await getMessages();

  const openPositions = messages?.careers?.positions?.openPositions || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const position = openPositions.find(
    (pos: { slug: string }) => pos.slug === slug
  );

  if (!position) {
    return (
      <div className="container mx-auto px-6 py-20 text-center pt-[152px]">
        <SearchX className="mx-auto mb-6 text-foreground" size={48} />
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {t("positions.page.notFoundPositionTitle")}
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto">
          {t("positions.page.notFoundPositionDescription")}
        </p>
      </div>
    );
  }

  return (
    <main>
      <section className="pb-20 pt-[152px] md:pb-32 md:pt-[200px]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link
                href="/careers/"
                className="text-brand-green hover:text-brand-green-dark transition duration-300"
              >
                <ChevronLeft className="inline-block mr-2" size={16} />
                {t("positions.page.backToCareers")}
              </Link>
            </nav>

            {/* Job Header */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {position.title}
                  </h1>
                  <p className="text-brand-gray-purple text-lg">
                    {position.location}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link
                    href={`mailto:careers@nivii.ai?subject=Application for ${position.title}`}
                  >
                    `<Button>{t("applyNow")}</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Job Content */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  {/* About Role */}
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {t("positions.page.aboutRole")}
                  </h2>
                  {position.aboutRole.map((p: string, i: number) => (
                    <p key={i} className="text-gray-600 mb-6">
                      {p}
                    </p>
                  ))}

                  {/* Responsibilities */}
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {t("positions.page.responsibilities")}
                  </h3>
                  <ul className="space-y-3 text-gray-600 mb-8">
                    {position.responsibilities.map(
                      (item: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="text-brand-green mr-3 relative inline-block">
                            •
                          </span>
                          {item}
                        </li>
                      )
                    )}
                  </ul>

                  {/* Requirements */}
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {t("positions.page.requirements")}
                  </h3>
                  <ul className="space-y-2 text-gray-600 mb-8">
                    {position.requirements.map((item: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-brand-green mr-3 relative inline-block">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Bonus Points */}
                  {position.bonusPoints && (
                    <>
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        {t("positions.page.bonusPoints")}
                      </h3>
                      <ul className="space-y-2 text-gray-600 mb-8">
                        {position.bonusPoints.map((item: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <span className="text-brand-green mr-3 relative inline-block">
                              •
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* Benefits */}
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {t("positions.page.benefits")}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    {position.benefits.map((item: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-brand-green mr-3 relative inline-block">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {t("positions.page.quickInfo")}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">
                        {position.quickInfo.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">
                        {position.quickInfo.experience}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">
                        {position.quickInfo.department}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Apply CTA */}
                <div className="rounded-xl p-6 text-gray-700">
                  <h3 className="text-lg font-semibold mb-2">
                    {t("positions.page.cta.title")}
                  </h3>
                  <p className="text-sm mb-4 opacity-90">
                    {t("positions.page.cta.description")}
                  </p>
                  <Link
                    href={`mailto:careers@nivii.ai?subject=Application for ${position.title}`}
                  >
                    <Button>{t("positions.page.cta.button")}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
