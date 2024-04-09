import { useAuthContext } from "../../hooks/useAuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({message}) => {
	const { user } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === user.userObj._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? user.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-primary-50" : "bg-gray-500";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
				<img alt='USER PIC' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs text-black flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;