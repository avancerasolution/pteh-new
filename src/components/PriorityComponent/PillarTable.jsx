"use client";

import React from "react";
import { motion } from "framer-motion";
import { Table } from "antd";
import { rowAnim } from "@/lib/Animation";

export default function PillarTable({ pillar }) {
  const columns = [
    {
      title: "Post Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "ACF Data",
      render: (_, record) => <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(record.acf, null, 2)}</pre>,
    },
  ];

  const dataSource =
    pillar.posts?.map((post) => ({
      key: post.id,
      title: post.title,
      acf: post.acf,
    })) || [];

  return (
    <motion.div variants={rowAnim} initial="hidden" animate="show" exit="hidden" className="mt-5">
      <h3 className="mb-4">{pillar.name} – Details</h3>

      <Table columns={columns} dataSource={dataSource} pagination={false} bordered />
    </motion.div>
  );
}
