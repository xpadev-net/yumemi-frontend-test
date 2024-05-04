import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Checkbox } from "./checkbox";

const values = [
  { label: "label1", value: "value1" },
  { label: "label2", value: "value2" },
  { label: "label3", value: "value3" },
  { label: "label4", value: "value4" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
  { label: "label5", value: "value5" },
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: (props) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    return (
      <Checkbox
        variant={"vertical"}
        label={"label"}
        required={props.required}
        values={props.values}
        selectedValues={selectedValues}
        onChange={setSelectedValues}
      />
    );
  },
} satisfies Meta<{
  required: boolean;
  values: { label: string; value: string }[];
}>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Required: Story = {
  args: {
    required: true,
    values,
  },
};

export const Default: Story = {
  args: {
    required: false,
    values,
  },
};
