import { Card, Typography, List, ListItem } from "@material-tailwind/react";
import logo from '../assets/logo.png';


const SideBar = ({ links }) => {
  return (
    <Card className="h-[calc(100vh-2rem)] bg-gray-50 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        {links.map((link, index) => (
          <ListItem className="text-primary-50 text-xl" key={index}>
            {link.icon} {/* Render the icon */}
            {link.label}
          </ListItem>
        ))}
        <hr className="my-2 border-primary-50" />
      </List>
    </Card>
  );
}

export default SideBar;
