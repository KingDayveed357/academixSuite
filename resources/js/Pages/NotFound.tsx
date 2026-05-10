import GridShape from "../components/common/GridShape";
import { Link, usePage } from "@inertiajs/react";
import PageMeta from "../components/common/PageMeta";

export default function NotFound() {
  const { is_central, app_url } = usePage<{ is_central: boolean; app_url: string }>().props;

  const isUnknownSchool = !is_central;

  return (
    <>
        <PageMeta
        title={isUnknownSchool ? "School Not Found" : "AcademixSuite | 404 Not Found"}
        description="We couldn't find the resource you were looking for."
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl uppercase">
            {isUnknownSchool ? "School Not Found" : "Error 404"}
          </h1>

          <img src="/images/error/404.svg" alt="404" className="dark:hidden" />
          <img
            src="/images/error/404-dark.svg"
            alt="404"
            className="hidden dark:block"
          />

          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg font-medium">
            {isUnknownSchool 
              ? "This school could not be found. It may have been deactivated or the link is incorrect." 
              : "We can’t seem to find the page you are looking for!"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={app_url}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              Go to main site
            </a>
            {isUnknownSchool && (
              <a
                href={`${app_url}/register`}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-700 transition-colors"
              >
                Register school
              </a>
            )}
          </div>
        </div>
        {/* <!-- Footer --> */}
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - AcademixSuite. All rights reserved.
        </p>
      </div>
    </>
  );
}
