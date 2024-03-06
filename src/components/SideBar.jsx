import {
    Card,
    Typography,
    List,
    ListItem
  } from "@material-tailwind/react";
 
   
  const SideBar =({links}) => {
    return (
      <Card className="h-[calc(100vh-2rem)] bg-green-500 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4 text-white flex flex-row items-center justify-center">
          <Typography variant="h5" color="blue-gray">
            Takwirti |
          </Typography>
          <img src="/logo_nobg_white.png" alt="logo" width={74} height={50}/>
        </div>
        <hr className="my-2 border-white" />
        <List>
            {links.map((link,index)=>(
                <ListItem  className="text-white text-xl" key={index}>
                    {link.label}
                </ListItem>
                
            ))}
            
        </List>
      </Card>
    );
  }

export default SideBar;