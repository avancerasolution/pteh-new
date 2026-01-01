import BackgroundClient from "@/components/BackgroundComponents/BackgroundClient";
import { Fragment, Suspense } from "react";

export const metadata = {
  title: "The Background | Ending Homelessness ",
  description: "The Plan to end homelessness in Bermuda by 2030",
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
