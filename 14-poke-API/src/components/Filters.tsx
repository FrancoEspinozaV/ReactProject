import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	TextField,
	Typography,
} from "@mui/material";
import { FiltersNumbers } from "./FiltersNumbers";
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
	const changeName = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		hangleChangeName(event.target.value);
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
						<FiltersNumbers
							handleChangeHeight={handleChangeHeight}
							handleChangeId={handleChangeId}
							handleChangeWeight={handleChangeWeight}
						/>
					</AccordionDetails>
				</Accordion>
			</div>
		</>
	);
}
