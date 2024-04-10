import { useState, useEffect } from "react";
import { getUserById } from "../../services/user.service";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  avatar: "/assets/avatars/avatar-anika-visser.png",
  city: "Iasi",
  country: "Romania",
  name: "Anika Visser",
  timezone: "GTM-7",
};

const AccountProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const user = await getUserById("65df2d289a8b913dd6489891");
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserById();
  }, []);
  return (
    <>
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src="/assets/avatars/avatar-anika-visser.png"
              sx={{
                height: 80,
                mb: 2,
                width: 80,
              }}
            />
            <Typography gutterBottom variant="h5">
            {JSON.stringify(user.email)}
              {user.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.city} {user.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.timezone}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth variant="text">
            Upload picture
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AccountProfile;
// export const AccountProfile = () => (
//   <Card>
//     <CardContent>
//       <Box
//         sx={{
//           alignItems: 'center',
//           display: 'flex',
//           flexDirection: 'column'
//         }}
//       >
//         <Avatar
//           src={user.avatar}
//           sx={{
//             height: 80,
//             mb: 2,
//             width: 80
//           }}
//         />
//         <Typography
//           gutterBottom
//           variant="h5"
//         >
//           {user.name}
//         </Typography>
//         <Typography
//           color="text.secondary"
//           variant="body2"
//         >
//           {user.city} {user.country}
//         </Typography>
//         <Typography
//           color="text.secondary"
//           variant="body2"
//         >
//           {user.timezone}
//         </Typography>
//       </Box>
//     </CardContent>
//     <Divider />
//     <CardActions>
//       <Button
//         fullWidth
//         variant="text"
//       >
//         Upload picture
//       </Button>
//     </CardActions>
//   </Card>
// );
