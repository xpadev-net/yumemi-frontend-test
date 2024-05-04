import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Dropdown } from "./dropdown.tsx";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: () => {
    const [selected, setSelected] = useState("テスト１");
    return (
      <Dropdown
        values={["テスト１", "テスト２", "テスト３"]}
        onChange={setSelected}
        selected={selected}
        label={"ラベル"}
      />
    );
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {},
};
