"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFutureEthosPosts,
  selectFutureEthosPosts,
  selectFutureEthosLoading,
} from "@/store/slices/futureEthosSlice";
import { mapFutureETHOS } from "@/lib/mapFutureETHOS";

export default function FutureETHOSTable() {
  const dispatch = useDispatch();
  const posts = useSelector(selectFutureEthosPosts);
  const loading = useSelector(selectFutureEthosLoading);

  useEffect(() => {
    dispatch(fetchFutureEthosPosts());
  }, [dispatch]);

  if (loading || !posts.length) return null;

  //    API → UI structure
  const futureETHOSData = mapFutureETHOS(posts);

  //    TOTALS (API DATA SE)
  const total2021 = futureETHOSData.reduce(
    (sectionSum, section) => sectionSum + section.items.reduce((itemSum, item) => itemSum + (item.y2021 || 0), 0),
    0
  );

  const total2022 = futureETHOSData.reduce(
    (sectionSum, section) => sectionSum + section.items.reduce((itemSum, item) => itemSum + (item.y2022 || 0), 0),
    0
  );

  return (
    <table className="ethos-table">
      <thead>
        <tr>
          <th></th>
          <th>No.</th>
          <th>Operational category</th>
          <th>Code</th>
          <th>Living situation</th>
          <th>Generic definition</th>
          <th>2021</th>
          <th>2022</th>
        </tr>
      </thead>

      <tbody>
        {futureETHOSData.map((section) =>
          section.items.map((item, index) => {
            const rowSpan = item.rows?.length || 1;

            return (
              <>
                <tr key={item.no}>
                  {index === 0 && (
                    <td
                      className="vertical-section"
                      rowSpan={section.items.reduce((sum, i) => sum + (i.rows?.length || 1), 0)}
                    >
                      {section.section}
                    </td>
                  )}

                  <td rowSpan={rowSpan}>{item.no}</td>

                  <td rowSpan={rowSpan}>
                    {typeof item.operational === "string" ? (
                      item.operational
                    ) : (
                      <>
                        <strong>{item.operational.title}</strong>
                        <ul>
                          {item.operational.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </td>

                  <td>{item.code || item.rows?.[0]?.code}</td>
                  <td>{item.living || item.rows?.[0]?.living}</td>
                  <td rowSpan={rowSpan}>{item.definition}</td>
                  <td rowSpan={rowSpan} className="center">
                    {item.y2021}
                  </td>
                  <td rowSpan={rowSpan} className="center">
                    {item.y2022}
                  </td>
                </tr>

                {item.rows?.slice(1).map((r) => (
                  <tr key={r.code}>
                    <td>{r.code}</td>
                    <td>{r.living}</td>
                  </tr>
                ))}
              </>
            );
          })
        )}

        {/*    FOOTER */}
        <tr className="footer-row">
          <td colSpan="6">
            Short stay is defined as normally less than one year. Long stay is defined as more than one year. (*)
            Includes drug rehabilitation institutions, psychiatric hospitals etc.
          </td>
          <td className="center">{total2021}</td>
          <td className="center">{total2022}</td>
        </tr>
      </tbody>
    </table>
  );
}
