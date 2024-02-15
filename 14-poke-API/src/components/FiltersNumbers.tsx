import { InputAdornment, TextField } from "@mui/material";

interface Props {
	handleChangeId: (id: number) => void;
	handleChangeHeight: (height: number) => void;
	handleChangeWeight: (weight: number) => void;
}

export function FiltersNumbers({
	handleChangeId,
	handleChangeWeight,
	handleChangeHeight,
}: Props) {
	const changeId = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const valueNumber = Number(event.target.value);

		if (valueNumber >= 0) {
			handleChangeId(valueNumber);
		}
	};

	const changeWeight = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const weight = Number(event.target.value);
		if (weight >= 0) {
			handleChangeWeight(weight);
		}
	};

	const changeHeight = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const height = Number(event.target.value);
		if (height >= 0) {
			handleChangeHeight(height);
		}
	};

	return (
		<div style={{ display: "flex", gap: 5 }}>
			<TextField
				InputProps={{
					startAdornment: <InputAdornment position="start">ID</InputAdornment>,
				}}
				label="id pokemon"
				variant="outlined"
				onChange={(event) => changeId(event)}
			/>
			<TextField
				label="altura"
				variant="outlined"
				InputProps={{
					startAdornment: <InputAdornment position="start">M</InputAdornment>,
				}}
				onChange={(event) => changeHeight(event)}
			/>
			<TextField
				label="peso"
				variant="outlined"
				InputProps={{
					startAdornment: <InputAdornment position="start">KG</InputAdornment>,
				}}
				onChange={(event) => changeWeight(event)}
			/>
		</div>
	);
}
