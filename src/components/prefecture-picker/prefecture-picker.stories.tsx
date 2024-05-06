import type { Meta, StoryObj } from "@storybook/react";

import { ApiKeyModal } from "@/components/api-key-modal/api-key-modal";

import { PrefecturePicker } from "./prefecture-picker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: () => (
    <>
      <ApiKeyModal />
      <PrefecturePicker selectedPrefectureIds={[]} />
    </>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
