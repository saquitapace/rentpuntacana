"use client";

import { useSelector } from "react-redux";
import { getUserId } from '@/store/slices/userProfileSlice';

//TODO: Protected Routes
export const checkAuth= () => {
	//Testing purpose
	const userId = useSelector(getUserId);

	return userId ? userId : null;
};
