import PrivacyClients from "@/components/PrivacyComponents/PrivacyClients";
import { Fragment, Suspense } from "react";

export const metadata = {
  title: "Privacy Policy | Ending Homelessness ",
  description: "The Plan to end homelessness in Bermuda by 2030",
};

export default function page() {
  return (
    <Fragment>
      <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
        <PrivacyClients />
      </Suspense>
    </Fragment>
  );
}
