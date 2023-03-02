import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Datepicker, DatepickerProps } from "../../core/ui/Datepicker";

export default {
    title: 'Example/Datepicker',
    component: Datepicker,
    argTypes: {
      minYear: { type: 'number' },
      maxYear: { type: 'number' },
    },
  } as ComponentMeta<typeof Datepicker>;


const Template: ComponentStory<typeof Datepicker> = (args: DatepickerProps) => <Datepicker minYear={args.minYear} maxYear={args.maxYear} />;

export const Primary = Template.bind({});