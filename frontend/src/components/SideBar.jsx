import { Card, Typography, List, ListItem } from "@material-tailwind/react";



const SideBar = ({ links }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-2/12 pt-20">
      <Card className="h-full bg-gray-50 w-full p-4 shadow-xl shadow-blue-gray-900/5 pt-10">
        <List>
          {links.map((link, index) => (
            <ListItem className="text-primary-50 text-xl shadow-sm shadow-primary-50" key={index}>
              {link.icon} {/* Render the icon */}
              {link.label}
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}



export default SideBar;
