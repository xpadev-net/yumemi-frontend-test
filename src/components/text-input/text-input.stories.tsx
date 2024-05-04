import type { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "./text-input.tsx";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: (props) => (
    <TextInput label={"label"} required={props.required} placeholder={""} />
  ),
} satisfies Meta<{ required: boolean }>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Required: Story = {
  args: {
    required: true,
  },
};

export const Default: Story = {
  args: {
    required: false,
  },
};
