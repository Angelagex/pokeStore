import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import type { MenuProps } from 'antd';

type Props = {};

const AppHeader = (props: Props) => {
  const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  return (
    <Header className="header">
      <div className="logo" />
      <Menu mode="horizontal" defaultSelectedKeys={["2"]} items={items1} />
    </Header>
  );
};

export default AppHeader;
