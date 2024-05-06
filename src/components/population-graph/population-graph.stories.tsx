import type { Meta, StoryObj } from "@storybook/react";

import { ApiKeyModal } from "@/components/api-key-modal/api-key-modal";

import { PopulationGraph } from "./population-graph";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: () => (
    <>
      <ApiKeyModal />
      <PopulationGraph selectedPrefIds={[3, 5, 8]} />
    </>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
