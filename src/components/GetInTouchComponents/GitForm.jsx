"use client";

import React, { Fragment, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { submitGitForm, resetGitForm } from "@/store/slices/GitFormSlice";

export default function GitForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.gitForm);

  useEffect(() => {
    if (success) {
      message.success("Message sent successfully!");
      form.resetFields();
      dispatch(resetGitForm());
    }

    if (error) {
      message.error(error);
      dispatch(resetGitForm());
    }
  }, [success, error, dispatch, form]);

  const onFinish = (values) => {
    dispatch(submitGitForm(values));
  };

  return (
    <Fragment>
      <h3>CONTACT US</h3>
      <Form layout="vertical" form={form} onFinish={onFinish} className="git-form">
        <div className="row">
          <div className="col-sm-6">
            {" "}
            <Form.Item name="firstName" rules={[{ required: true, message: "Please enter your first name" }]}>
              <Input placeholder="Enter your first name" />
            </Form.Item>
          </div>
          <div className="col-sm-6">
            {" "}
            <Form.Item name="lastName" rules={[{ required: true, message: "Please enter your last name" }]}>
              <Input placeholder="Enter your last name" />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item name="phone" rules={[{ required: true, message: "Please enter your phone number" }]}>
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item name="message" rules={[{ required: true, message: "Please enter your message" }]}>
          <Input.TextArea rows={5} placeholder="Write your message here..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Send Message →
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
