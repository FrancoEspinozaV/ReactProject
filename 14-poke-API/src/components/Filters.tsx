import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { TypeSelect } from "./TypeSelect";

interface Props {
	handleChangeType: (type: string) => void;
	hangleChangeName: (name: string) => void;
	handleChangeId: (id: number) => void;
	handleChangeHeight: (height: number) => void;
	handleChangeWeight: (weight: number) => void;
}

export function Filters({
	handleChangeType,
	handleChangeId,
	hangleChangeName,
	handleChangeHeight,
	handleChangeWeight,
}: Props) {
	const changeId = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const valueNumber = Number(event.target.value);

		if (valueNumber >= 0) {
			handleChangeId(valueNumber);
		}
	};

	const changeName = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		hangleChangeName(event.target.value);
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
		<>
			<div style={{ marginBottom: 51, maxWidth: "400px" }}>
				<Accordion>
					<AccordionSummary aria-controls="panel1-content" id="panel1-header">
						<Typography>Filtros</Typography>
					</AccordionSummary>
					<AccordionDetails
						style={{ display: "flex", flexDirection: "column", gap: 10 }}
					>
						<TypeSelect handleChangeType={handleChangeType} />
						<TextField
							label="nombre"
							variant="outlined"
							onChange={(event) => changeName(event)}
						/>
						<div style={{ display: "flex", gap: 5 }}>
							<TextField
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">ID</InputAdornment>
									),
								}}
								label="id pokemon"
								variant="outlined"
								onChange={(event) => changeId(event)}
							/>
							<TextField
								label="altura"
								variant="outlined"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">M</InputAdornment>
									),
								}}
								onChange={(event) => changeHeight(event)}
							/>
							<TextField
								label="peso"
								variant="outlined"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">KG</InputAdornment>
									),
								}}
								onChange={(event) => changeWeight(event)}
							/>
						</div>
					</AccordionDetails>
				</Accordion>
			</div>
		</>
	);
}
