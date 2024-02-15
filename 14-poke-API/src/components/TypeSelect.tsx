import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { TYPE } from "../const";

interface Props {
	handleChangeType: (type: string) => void;
}

export function TypeSelect({ handleChangeType }: Props) {
	const typesPokemon = Object.values(TYPE);
	const [type, setType] = useState("");

	const handleChange = (event: SelectChangeEvent) => {
		const typeElement = event.target.value;
		setType(typeElement);
		handleChangeType(typeElement);
	};
	return (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">Tipos</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={type}
				label="Tipos"
				onChange={handleChange}
			>
				{typesPokemon.map((typeName) => {
					return (
						<MenuItem key={typeName} value={typeName}>
							{typeName}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
}
