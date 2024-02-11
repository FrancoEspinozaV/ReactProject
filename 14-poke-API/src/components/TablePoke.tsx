import {
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@tremor/react";
import { InfoPokemon } from "../types";
export function TablePoke({ pokes }: { pokes: InfoPokemon[] }) {
	return (
		<div className="mx-auto max-w-2xl">
			<Card className="rounded-2xl">
				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell className="text-center">#</TableHeaderCell>
							<TableHeaderCell className="text-center">Nombre</TableHeaderCell>
							<TableHeaderCell className="text-center">
								Altura (M)
							</TableHeaderCell>
							<TableHeaderCell className="text-center">
								Peso (Kg)
							</TableHeaderCell>
							<TableHeaderCell className="text-center">Tipos</TableHeaderCell>
							<TableHeaderCell className="text-center">imagen</TableHeaderCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{pokes.map((pokemon) => {
							return (
								<TableRow key={pokemon.name}>
									<TableCell className="text-center">{pokemon.id}</TableCell>
									<TableCell className="text-center">{pokemon.name}</TableCell>
									<TableCell className="text-center">
										{pokemon.height / 10}{" "}
									</TableCell>
									<TableCell className="text-center">
										{pokemon.weight / 10}{" "}
									</TableCell>
									<TableCell className="text-center">
										{pokemon.types.join(", ")}
									</TableCell>
									<TableCell className="text-center">
										<img
											src={pokemon.spriteUrl}
											alt={`imagen with pokemon ${pokemon.name}`}
										/>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Card>
		</div>
	);
}
