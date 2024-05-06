import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import { Button } from "./button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: (
    props: Pick<ComponentProps<typeof Button>, "variant" | "size">,
  ) => <Button {...props}>{props.variant}</Button>,
} satisfies Meta<{
  size: "XSmall" | "small" | "medium" | "large";
  variant: "primary" | "secondary";
}>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Large: Story = {
  args: {
    size: "large",
    variant: "primary",
  },
};
export const Medium: Story = {
  args: {
    size: "medium",
    variant: "primary",
  },
};
export const Small: Story = {
  args: {
    size: "small",
    variant: "primary",
  },
};
export const XSmall: Story = {
  args: {
    size: "XSmall",
    variant: "primary",
  },
};
