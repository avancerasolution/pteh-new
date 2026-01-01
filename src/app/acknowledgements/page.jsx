import AcknowledgementsClient from "@/components/AcknowledgementsCompnent/AcknowledgementsClient";
import ExecutiveClient from "@/components/ExecutiveComponents/ExecutiveClient";
import { Fragment, Suspense } from "react";

export const metadata = {
  title: "Acknowledgements | Ending Homelessness ",
  description: "The Plan to end homelessness in Bermuda by 2030",
};

export default function page() {
  return (
    <Fragment>
      <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
        <AcknowledgementsClient />
      </Suspense>
    </Fragment>
  );
}
