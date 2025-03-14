"use client";

import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const SearchPage: FC = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q");

	const [results, setResults] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch search results
	useEffect(() => {
		if (!query) return;//Todo: Redirect to home or somewhere

		if (query.length < 3) return;//Todo: Redirect to home or somewhere

		const fetchResults = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/search/get?q=${encodeURIComponent(query)}`
				)

				if (response.status === 200) {
					setResults(response.data)
				}
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchResults();
	}, [query]);

	//TODO: UI
	return (
		<div className="nc-Blank">
			<div className="container h-screen">
			<div className="flex h-full w-full max-w-3xl flex-col mx-auto">
				<div className="flex-grow overflow-auto">
					{loading && <p>Loading...</p>}
					{error && <p className="text-red-500">{error}</p>}
					{!loading &&
						results.map((item, index) => (
							<div key={index} className="p-4 border-b">
								<h3 className="text-lg font-bold">{item.userId}</h3>
								<p>firstName: {item.firstName}</p>
								<p>lastName: {item.lastName}</p>
								<p>listingId: {item.listingId}</p>
								<p>title: {item.title}</p>
							</div>
					))}
				</div>
			</div>
			</div>
		</div>
	);
};

export default SearchPage;