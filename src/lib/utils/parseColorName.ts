export const parseColorName = (color: string) => {
	return color.toLowerCase().replace(/ /g, "-");
};
