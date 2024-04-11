import useConversation from '../../zustand/useConversation';
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({conversation,lastIdx}) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
	
	const isSelected = selectedConversation?._id === conversation._id;
	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-green-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-green-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : "offline"}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.image}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-black'>{conversation.nom} {conversation.prenom}</p>
					</div>
				</div>
			</div>

			<div className='divider my-0 py-0 h-1' />
			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;