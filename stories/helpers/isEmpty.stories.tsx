import React, { useEffect, useState } from 'react';

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import { ComponentStory, ComponentMeta } from '@storybook/react';

import useValidate from "../../src/use-validate";

const IsEmptyComponent = (props: any) => {
	const [data, setData] = useState(props);

	const { isEmpty } = useValidate(props);

	useEffect(() => {
		setData(props);
	}, [props]);

	return (				
		<Stack spacing={2} sx={{ backgroundColor: "#f6f6f6", p: 2 }}>							
			<Stack spacing={2} sx={{ backgroundColor: "#ffffff", border: "solid 1px #f6f6f6", borderRadius: "4px", p: 4 }}>
				<Divider textAlign="center">isEmpty Helper Example</Divider>
			</Stack>			
						
			<Stack sx={{ backgroundColor: "#ffffff", p: 4 }}>
				<pre>
					isEmpty(data.items) =&gt; {isEmpty(data.items) ? "true" : "false"}
				</pre>
			</Stack>
		</Stack>
	);
};

export default {
  title: 'Helpers',
  component: IsEmptyComponent,
	args: { items: [] }
} as ComponentMeta<typeof IsEmptyComponent>;

const Template: ComponentStory<typeof IsEmptyComponent> = (args) => <IsEmptyComponent {...args} />;

export const isEmpty = Template.bind({});
