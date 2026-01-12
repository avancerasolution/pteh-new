import DataClients from "@/components/DataComponents/DataClients";
import GlobalLoader from "@/components/Global/GlobalLoader";
import PrivacyClients from "@/components/PrivacyComponents/PrivacyClients";
import { Fragment, Suspense } from "react";

export const metadata = {
  title: "Our Data | Ending Homelessness ",
  description: "The Plan to end homelessness in Bermuda by 2030",
};

export default function page() {
  return (
    <Fragment>
      <Suspense
        fallback={
          <div className="text-center py-5">
            <GlobalLoader />
          </div>
        }
      >
        <DataClients />
      </Suspense>
    </Fragment>
  );
}
