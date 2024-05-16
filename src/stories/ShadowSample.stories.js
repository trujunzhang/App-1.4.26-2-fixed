import React, {useState} from 'react';
import ShadowSamples from '@components/ShadowSamples';

/**
 * We use the Component Story Format for writing stories. Follow the docs here:
 *
 */
export default {
    title: 'Components/ShadowSamples',
    component: ShadowSamples,
};

function Template(args) {
    const [value, setValue] = useState('');
    return <ShadowSamples />;
}

// Arguments can be passed to the component by binding
// See: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Default = Template.bind({});

export {Default};
