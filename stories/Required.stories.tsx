import React, { ChangeEvent, useEffect, useState } from 'react';

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { ComponentStory, ComponentMeta } from '@storybook/react';

import useValidate from "../src/use-validate";

const RequiredComponent = (props: any) => {
	const [data, setData] = useState(props);
	const [errors, setErrors] = useState<any[]>([]);

	const { isPristine, required, validate } = useValidate(props);

	useEffect(() => {
		setData(props);
		setErrors([]);
	}, [props]);

	const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ name: e.target.value });

		setErrors(validate([required("name", "Name is required")], { name: e.target.value }));		
	};

	return (				
		<Stack spacing={2} sx={{ backgroundColor: "#f6f6f6", p: 2 }}>							
			<Stack spacing={2} sx={{ backgroundColor: "#ffffff", border: "solid 1px #f6f6f6", borderRadius: "4px", p: 4 }}>
				<Divider textAlign="center">Required Validator Example</Divider>
				<TextField error={errors.length > 0} fullWidth helperText={errors[0]?.messages[0] ?? " "} label="Name" name="name" value={data.name} onChange={handleChangeName} />
				<Button disabled={isPristine(data) || errors.length > 0} fullWidth variant="outlined">Enabled When Valid</Button>
			</Stack>			
			<Stack direction="row" spacing={2}>
				<Stack spacing={2} sx={{ backgroundColor: "#ffffff", p: 4, width: "100%" }}>
					<Divider textAlign="center">Model</Divider>
					<pre>
						&#10100; &quot;name&quot;: &quot;{data.name}&quot; &#125;
					</pre>
				</Stack>
				<Stack spacing={2} sx={{ backgroundColor: "#ffffff", p: 4, width: "100%" }}>
					<Divider textAlign="center">Validator</Divider>
					<pre>
						required(&quot;name&quot;, &quot;Name is required&quot;)
					</pre>
				</Stack>
			</Stack>	
		</Stack>
	);
};

export default {
  title: 'Validators/Required',
  component: RequiredComponent,
	args: { name: "" }
} as ComponentMeta<typeof RequiredComponent>;

const Template: ComponentStory<typeof RequiredComponent> = (args) => <RequiredComponent {...args} />;

export const Required = Template.bind({});
