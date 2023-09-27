import type { Meta, StoryObj } from "@storybook/react";

import JobColumn from "../components/core/JobColumn";

const JobColumnMeta: Meta<typeof JobColumn> = {
  title: "Core/JobColumn",
  component: JobColumn,
};

export default JobColumnMeta;

type JobColumnStory = StoryObj<typeof JobColumn>;

export const Primary: JobColumnStory = {
  args: {
    title: "Job Title",
    icon: ":)",
    addJob: () => {},
    jobs: ["test", "jobs"],
  },
};
