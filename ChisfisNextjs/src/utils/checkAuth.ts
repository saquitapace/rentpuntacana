import { useSelector } from 'react-redux';
import { getUserId } from '@/store/slices/userProfileSlice';

//TODO: Protected Routes

const checkAuth = (function() {

	//Testing purpose
	const userId = useSelector(getUserId);

	return userId ? userId : null;
})();

export default checkAuth;