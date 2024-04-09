import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
    const { user }= useAuthContext();
    console.log(user);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`http://localhost:4000/api/users/${user.userObj._id}/friends`);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;