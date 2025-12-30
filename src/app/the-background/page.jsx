import BackgroundClient from "@/components/BackgroundComponents/backgroundClient";
import { Fragment, Suspense } from "react";

export const metadata = {
  title: "About Us — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function page() {
  return (
    <Fragment>
      <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
        <BackgroundClient />;
      </Suspense>
    </Fragment>
  );
}
