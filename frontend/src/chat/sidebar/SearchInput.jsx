
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 2) {
			return toast.error("Search term must be at least 2 characters long");
			
		}
		const conversation = conversations.find((c) => c.nom.toLowerCase().includes(search.toLowerCase()) ||
		c.prenom.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full bg-gray-100'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-primary-50 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;