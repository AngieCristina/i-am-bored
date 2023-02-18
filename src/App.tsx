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
    <Box display="flex">
      <Card
        overflow="hidden"
        border="3px solid #000"
        margin="auto"
        mt="60px"
        shadow="lg"
        borderWidth="3px"
      >
        <Stack m="40px" spacing="24px">
          <HStack display="flex" justifyContent="center">
            <text fontSize="xl">How many boring people?</text>
            <Input
              h="46px"
              w="86px"
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
          </HStack>
          <CardFooter justifyContent="center">
            <Image
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/d6649a62874689.5a9ea800b1d58.jpg"
              alt="bored"
            />
          </CardFooter>
          {activity && (
            <Heading maxW="32rem" noOfLines={2} size="lg">
              {activity.activity}
            </Heading>
          )}
        </Stack>
      </Card>
    </Box>
  );
}

export default App;
