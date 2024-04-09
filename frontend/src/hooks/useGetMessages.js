import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";
const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { user } = useAuthContext();
	const { messages, setMessages, selectedConversation } = useConversation();
	console.log(selectedConversation);
	console.log(user.userObj._id);
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`http://localhost:4000/chat/messages/${selectedConversation._id}?senderId=${user.userObj._id}`, {
        		method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;