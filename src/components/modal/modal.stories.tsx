import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./modal";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: () => (
    <Modal onBackgroundClick={() => console.log("bg clicked")}>
      <h1>test modal</h1>
      <p>test content</p>
    </Modal>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
