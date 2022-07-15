import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ListProducts = () => {
	const [listData, setListData] = useState();
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		const res = await axios("https://s3.amazonaws.com/open-to-cors/assignment.json");
		const products = res.data.products;
		const listArr = [];

		for (const element in products) {
			const listItem = products[element];
			let ID = "_" + Math.random().toString(36).substr(2, 9);
			products[element].id = ID;
			listArr.push(listItem);
			listArr.sort((a, b) => {
				return a.popularity - b.popularity;
			});
		}

		setListData(listArr);
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 500 }} aria-label="simple table">
				<TableHead sx={{ backgroundColor: "lightGrey" }}>
					<TableRow>
						<TableCell sx={{ fontSize: 20 }}>
							<strong>Title</strong>
						</TableCell>
						<TableCell sx={{ fontSize: 20 }}>
							<strong>Price</strong>
						</TableCell>
						<TableCell sx={{ fontSize: 20 }}>
							<strong>Popularity</strong>
						</TableCell>
						<TableCell sx={{ fontSize: 20 }}>
							<strong>Sub-Category</strong>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{loading ? (
						<TableRow>
							<TableCell>"Loading.."</TableCell>
						</TableRow>
					) : (
						listData.map((item) => (
							<TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell sx={{ fontSize: 18 }}>{item.title}</TableCell>
								<TableCell sx={{ fontSize: 18 }}>{item.price}</TableCell>
								<TableCell sx={{ fontSize: 18 }}>{item.popularity}</TableCell>
								<TableCell sx={{ fontSize: 18 }}>{item.subcategory}</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ListProducts;
