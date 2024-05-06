import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/button/button.tsx";

import { ErrorBanner } from "./error-banner.tsx";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  component: () => (
    <ErrorBanner title={"都道府県データの取得に失敗しました"}>
      <Button size={"medium"} variant={"secondary"}>
        APIキーを変更
      </Button>
    </ErrorBanner>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
