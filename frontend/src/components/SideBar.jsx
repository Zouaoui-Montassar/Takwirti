import {
    Card,
    Typography,
    List,
    ListItem
  } from "@material-tailwind/react";
 
   
  const SideBar =({links}) => {
    return (
      <Card className="h-auto bg-white w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 pt-2">
        <div className="mb-2 p-4 text-green-500 flex flex-row items-center justify-center">
          <Typography variant="h5" color="blue-gray">
            Takwirti |
          </Typography>
          <img src="/logo_nobg_white.png" alt="logo" width={74} height={50}/>
        </div>
        <hr className="my-2 border-green-500" />
        <List>
            {links.map((link,index)=>(
                <ListItem  className="text-green-500 text-xl" key={index}>
                    {link.label}
                </ListItem>
                
            ))}
            
        </List>
      </Card>
    );
  }

export default SideBar;