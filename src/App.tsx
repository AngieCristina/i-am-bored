import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Input,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Stack,
  Image,
  HStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";

interface Activity {
  activity: string;
  participants: number;
}

function App() {
  const [activity, setActivity] = useState<Activity>();
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState("");

  const fetchActivityData = () => {
    setLoading(true);
    fetch(`http://www.boredapi.com/api/activity?participants=${participants}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setActivity(data);
      });
  };
  useEffect(() => {
    if (participants) {
      fetchActivityData();
      setLoading(false);
    }
  }, [participants]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
      <Card overflow="hidden" shadow="lg">
        <Stack m="60px" spacing="100px">
          <HStack display="flex" flexDirection="column" justifyContent="center">
            <Box display="flex" alignItems="center">
              <Text fontSize="xs">How many boring people?</Text>
              <Input
                h="46px"
                w="86px"
                ml="2"
                placeholder="Max. 5"
                focusBorderColor="lime"
                type="number"
                value={participants}
                onChange={(e) => {
                  let input = e.target.value;
                  if (!/^[1-5]$/.test(input)) {
                    setParticipants("");
                  } else {
                    setParticipants(input);
                  }
                }}
                min={1}
                max={5}
              />
            </Box>
            <Box p={4}>
              {activity && (
                <Image
                  w="20"
                  src="https://www.svgrepo.com/show/188346/pointing-down-finger.svg"
                ></Image>
              )}
            </Box>
            {activity && <Heading size="xl">{activity.activity}</Heading>}

            <CardHeader mt={20} justifyContent="center">
              {!activity && (
                <Image
                  src="https://i.pinimg.com/564x/49/be/b1/49beb13e6172a8017a1adae8ee584a09.jpg"
                  alt="bored"
                />
              )}
              {activity && (
                <Image
                  boxSize="150px"
                  src="https://i.pinimg.com/564x/dc/09/04/dc09046fd93d997cb22c8c41ab4d0eeb.jpg"
                  alt="notbored"
                />
              )}
            </CardHeader>
          </HStack>
        </Stack>
      </Card>
    </Box>
  );
}

export default App;
