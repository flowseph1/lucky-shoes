import { FragmentContainer } from "@/components/admin/fragment-container";
import { AdminHeading } from "@/components/admin/heading";
import { SneakerTable } from "@/components/admin/sneaker/sneaker-table";
import { Button } from "@/components/ui/buttons";
import { IoMdAdd } from "react-icons/io";

type Gender = "men" | "female" | "unisex" | "youth";

type Status = "active" | "inactive";

export interface Sneaker {
	id: number;
	brand_name: string;
	category: string[];
	color: string;
	gender: Gender[];
	grid_picture_url: string;
	main_picture_url: string;
	name: string;
	keywords: string[];
	release_date: Date | string;
	release_year: number;
	slug: string;
	status: Status;
	story_html: string | null;
}

const DATA_TABLE: Sneaker[] = [
	{
		id: 218099,
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "Black",
		gender: ["men"],
		keywords: [],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png",
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png",
		name: "Air Jordan 1 Retro High OG 'Shadow' 2018",
		release_date: "2018-04-14T23:59:59.000Z",
		release_year: 2018,
		slug: "air-jordan-1-retro-high-og-shadow-2018-555088-013",
		status: "active",
		story_html:
			"<p>This Nike Air Jordan 1 Retro High OG &#39;Shadow&#39; 2018 is a retro re-release of an original 1985 colorway. The shoe features a black and medium grey leather upper with a white midsole and black outsole. It also features OG Nike Air branding on the tongue and the Wings logo on the ankle collar. It was last retroed in 2013, and a low-top version dropped in 2015.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "Black",
		gender: ["youth"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/020/806/444/original/507844_00.png.png",
		id: 507844,
		keywords: ["black cement", "bred", "jordan 4 bred", "underRetail"],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/020/806/444/original/507844_00.png.png",
		name: "Air Jordan 4 Retro OG GS 'Bred' 2019",
		release_date: "2019-05-04T23:59:59.000Z",
		release_year: 2019,
		slug: "air-jordan-4-retro-og-gs-bred-408452-060",
		status: "active",
		story_html: null,
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "Black",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/008/654/900/original/52015_00.png.png",
		id: 52015,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/008/654/900/original/52015_00.png.png",
		name: "Air Jordan 11 Retro 'Space Jam' 2016",
		release_date: "2016-12-09T23:59:59.000Z",
		release_year: 2016,
		slug: "air-jordan-11-retro-space-jam-378037-003",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Space Jam’ 2016 commemorates the 20th anniversary of the movie ‘Space Jam.’ Worn by Michael Jordan as a Player Exclusive (PE) in both the movie and the 1995 NBA Playoffs, the 2016 retro ended up being Nike’s largest and most successful shoe launch ever. This 2016 sneaker is a more faithful reproduction of the original PE than the 2000 and 2009 retros. The sneaker also swaps the traditional #23 for MJ’s comeback #45 on the heel, a first for an Air Jordan 11 retail release. </p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "Red",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/008/870/353/original/235806_00.png.png",
		id: 235806,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/008/870/353/original/235806_00.png.png",
		name: "Air Jordan 11 Retro 'Win Like '96'",
		release_date: "2017-12-09T23:59:59.000Z",
		release_year: 2017,
		slug: "air-jordan-11-retro-gym-red-378037-623-abb4fed8-42d8-4998-9858-47500cc06cc7",
		status: "active",
		story_html:
			"<p>For Chicago Bulls Fans, the historical significance of the Air Jordan 11 Retro ‘Win Like 96’ will be abundantly clear. 1996 is the year that the Bulls capped off the regular season with a record-breaking 72 wins, on their way to a fourth NBA title in six seasons. Michael wore the Jordan 11 during that magical run, and this December 2017 release, dressed in a dazzling shade of red, honors the ’96 squad that couldn’t lose.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
	{
		brand_name: "Air Jordan",
		category: ["basketball"],
		color: "White",
		gender: ["men"],
		grid_picture_url:
			"https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		id: 13607,
		keywords: [],
		main_picture_url:
			"https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png",
		name: "Air Jordan 11 Retro 'Legend Blue' 2014",
		release_date: "2014-12-20T23:59:59.000Z",
		release_year: 2014,
		slug: "air-jordan-11-retro-legend-blue-378037-117",
		status: "active",
		story_html:
			"<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n",
	},
];

export function generateMetadata() {
	return {
		title: "Admin - Sneakers",
		description: "Manage your sneakers",
	};
}

export default function ProductsPage() {
	return (
		<FragmentContainer>
			<AdminHeading
				title="Productos"
				subtitle="Gestiona los productos de tu tienda"
			/>

			<div className="flex flex-col gap-6">
				<Button
					title="Agregar Producto"
					className="w-fit"
					leftIcon={<IoMdAdd />}
					onClick={() => {}}
				/>
				<SneakerTable data={DATA_TABLE} />
			</div>
		</FragmentContainer>
	);
}
