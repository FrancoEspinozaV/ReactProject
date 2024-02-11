import {
	NumberInput,
	SearchSelect,
	SearchSelectItem,
	TextInput,
} from "@tremor/react";
import { TYPE } from "../const";
interface Props {
	handleChangeType: (type: string) => void;
	hangleChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleChangeId: (id: number) => void;
	handleChangeHeight: (height: number) => void;
	handleChangeWeight: (weight: number) => void;
}

export function Filters({
	handleChangeType,
	hangleChangeName,
	handleChangeId,
	handleChangeHeight,
	handleChangeWeight,
}: Props) {
	const typesPokemon = Object.values(TYPE);

	return (
		<div className="mx-auto max-w-2xl flex flex-row justify-between px-5">
			<div className="flex flex-col">
				<div className="mb-2 text-center font-mono text-sm text-slate-500">
					Tipos
				</div>
				<SearchSelect
					className="mb-5"
					onValueChange={(value) => handleChangeType(value)}
				>
					{typesPokemon.map((type) => (
						<SearchSelectItem
							style={{ background: "white" }}
							key={type}
							value={type}
						>
							{type}
						</SearchSelectItem>
					))}
				</SearchSelect>

				<div className="mb-2 text-center font-mono text-sm text-slate-500">
					Nombre
				</div>
				<TextInput
					onChange={(event) => hangleChangeName(event)}
					placeholder="bulbasaur, charmander, ..."
				/>
			</div>
			<div>
				<div className="mb-2 text-center font-mono text-sm text-slate-500">
					id
				</div>
				<NumberInput
					min={0}
					onValueChange={(id) => {
						handleChangeId(id);
					}}
					placeholder="1"
					className="mb-5 mx-auto max-w-sm"
				/>
				<div className="mb-2 text-center font-mono text-sm text-slate-500">
					altura
				</div>
				<NumberInput
					min={0}
					onValueChange={(height) => {
						handleChangeHeight(height);
					}}
					placeholder="0.7"
					className="mb-5 mx-auto max-w-sm"
				/>
				<div className="mb-4 text-center font-mono text-sm text-slate-500">
					peso
				</div>
				<NumberInput
					min={0}
					onValueChange={(weight) => {
						handleChangeWeight(weight);
					}}
					placeholder="6.9"
					className="mb-5 mx-auto max-w-sm"
				/>
			</div>
		</div>
	);
}
