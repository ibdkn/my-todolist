import type {Meta, StoryObj} from '@storybook/react';

import {action} from '@storybook/addon-actions'
import {AddItemForm} from "../components/AddItemForm/AddItemForm";

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: {
        addItem: action('Button clicked inside form')
    },
};
