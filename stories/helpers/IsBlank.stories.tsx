import React, { ChangeEvent, useEffect, useState } from 'react';

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { ComponentStory, ComponentMeta } from '@storybook/react';

import useValidate from "../../src/use-validate";

const IsBlankComponent = (props: any) => {
	const [data, setData] = useState(props);

	const { isBlank } = useValidate(props);

	useEffect(() => {
		setData(props);
	}, [props]);

	const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ name: e.target.value });		
	};

	return (				
		<Stack spacing={2} sx={{ backgroundColor: "#f6f6f6", p: 2 }}>							
			<Stack spacing={2} sx={{ backgroundColor: "#ffffff", border: "solid 1px #f6f6f6", borderRadius: "4px", p: 4 }}>
				<Divider textAlign="center">isBlank Helper Example</Divider>
				<TextField fullWidth helperText=" " label="Name" name="name" value={data.name} onChange={handleChangeName} />
			</Stack>			
			<Stack direction="row" spacing={2}>				
				<Stack spacing={2} sx={{ backgroundColor: "#ffffff", p: 4, width: "100%" }}>
					<Divider textAlign="center">Helper</Divider>
					<pre>
						isBlank(data.name) =&gt; {isBlank(data.name) ? "true" : "false"}
					</pre>
				</Stack>
			</Stack>	
		</Stack>
	);
};

export default {
  title: 'Helpers',
  component: IsBlankComponent,
	args: { name: "" }
} as ComponentMeta<typeof IsBlankComponent>;

const Template: ComponentStory<typeof IsBlankComponent> = (args) => <IsBlankComponent {...args} />;

export const isBlank = Template.bind({});
