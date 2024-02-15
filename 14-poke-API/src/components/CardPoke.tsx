import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import { useState } from "react";
import { InfoPokemon } from "../types";
import { SvgHeart } from "./SvgHeart";
import { SvgPokeball } from "./SvgPokeball";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: "#f5f5f9",
		color: "rgba(0, 0, 0, 0.87)",
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: "1px solid #dadde9",
	},
	[`& .${tooltipClasses.arrow}`]: {
		color: "#f5f5f9",
	},
}));

// traer los datos
// {imgDefault,imgShiny, stats, id, nombre, types} --> crear interface
export default function CardPoke({ poke }: { poke: InfoPokemon }) {
	const [isShiny, setIsShiny] = useState(false);

	const handleChangeShiny = () => {
		setIsShiny((prev) => !prev);
	};

	return (
		<div className="wrapper">
			<div className={`img-pokemon ${poke.types[0]}-opacity`}>
				{!isShiny ? (
					<img src={poke.spriteUrl} alt={`an imagen of ${poke.name}`} />
				) : (
					<img
						src={poke.spriteUrlShiny}
						alt={`an imagen of ${poke.name} shiny`}
					/>
				)}

				<div className="left-icon"> </div>
				<div className="icons-img">
					<HtmlTooltip
						title={
							<div className="container-stats">
								<p>
									{poke.height / 10} (M) - {poke.weight / 10} (KG)
								</p>
								{poke.stats.map((statElement) => (
									<div key={statElement.name}>
										<p>
											{statElement.name}:{" "}
											<strong>{statElement.base_stat}</strong>
										</p>
									</div>
								))}
							</div>
						}
						arrow
						placement="top"
					>
						<div className="pointer">
							<SvgHeart />
						</div>
					</HtmlTooltip>
					{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div className="pointer" onClick={handleChangeShiny}>
						<SvgPokeball />
					</div>
				</div>
				<div className="right-icon"> </div>
			</div>
			<div className="info-poke">
				<span className="id-poke">N° {poke.id}</span>
				<p className="name-poke">{poke.name}</p>
				<div className="wrapper-type">
					{poke.types.map((type) => {
						return (
							<span key={type} className={`type ${type}`}>
								{type}
							</span>
						);
					})}
				</div>
			</div>
		</div>
	);
}
